
-module(pd_db).
-behaviour(gen_server).

-export([
    start_link/0,
    query/1,
    query/2,
    transaction/1
]).

-export([
    init/1,
    handle_call/3,
    handle_cast/2,
    handle_info/2,
    terminate/2,
    code_change/3
]).

%% ============================================================
%% API
%% ============================================================

start_link() ->
    gen_server:start_link(
        {local, ?MODULE},
        ?MODULE,
        [],
        []
    ).

%% SQL query without parameters.
query(Sql) ->
    gen_server:call(
        ?MODULE,
        {query, Sql},
        15000
    ).

%% Parameterized SQL query.
query(Sql, Params) ->
    gen_server:call(
        ?MODULE,
        {query, Sql, Params},
        15000
    ).

%% Execute several database operations atomically.
%% The callback receives the PostgreSQL connection.
transaction(Fun) when is_function(Fun, 1) ->
    gen_server:call(
        ?MODULE,
        {transaction, Fun},
        infinity
    );

transaction(_Fun) ->
    {error, invalid_transaction_callback}.


%% ============================================================
%% GEN_SERVER INITIALIZATION
%% ============================================================

init([]) ->
    case os:getenv("PD_DB_PASSWORD") of
        false ->
            {stop, missing_pd_db_password};

        Password ->
            Options = #{
                host => "127.0.0.1",
                port => 5432,
                username => "pd_app",
                password => Password,
                database => "peuple_dabord_rdc",
                ssl => false,
                timeout => 5000,
                application_name => "peuple_dabord_rdc_otp"
            },

            case epgsql:connect(Options) of
                {ok, Connection} ->
                    {ok, Connection};

                {error, Reason} ->
                    {stop, {postgres_connection_failed, Reason}}
            end
    end.


%% ============================================================
%% GEN_SERVER CALL HANDLERS
%% ============================================================

%% Transaction handler.
handle_call(
    {transaction, Fun},
    _From,
    Connection
) ->

    TransactionFun = fun(C) ->
        case Fun(C) of

            {error, Reason} ->
                erlang:error(
                    {transaction_aborted, Reason}
                );

            {rollback, Reason} ->
                erlang:error(
                    {transaction_aborted, Reason}
                );

            Result ->
                Result
        end
    end,

    Result = epgsql:with_transaction(
        Connection,
        TransactionFun,
        #{
            reraise => false,
            ensure_committed => true
        }
    ),

    Reply = case Result of

        {rollback, {transaction_aborted, Reason}} ->
            {error, {transaction_rolled_back, Reason}};

        {rollback, Reason} ->
            {error, {transaction_failed, Reason}};

        TransactionResult ->
            {ok, TransactionResult}
    end,

    {reply, Reply, Connection};


%% Parameterized SQL query.
handle_call(
    {query, Sql, Params},
    _From,
    Connection
) ->
    Result = epgsql:equery(
        Connection,
        Sql,
        Params
    ),

    {reply, Result, Connection};


%% SQL query without parameters.
handle_call(
    {query, Sql},
    _From,
    Connection
) ->
    Result = epgsql:squery(
        Connection,
        Sql
    ),

    {reply, Result, Connection};


%% Unsupported request.
handle_call(
    _Request,
    _From,
    State
) ->
    {reply, {error, unsupported_request}, State}.


%% ============================================================
%% ASYNCHRONOUS MESSAGE HANDLERS
%% ============================================================

handle_cast(_Message, State) ->
    {noreply, State}.

handle_info(_Info, State) ->
    {noreply, State}.


%% ============================================================
%% TERMINATION
%% ============================================================

terminate(_Reason, Connection) ->
    try
        epgsql:close(Connection)
    catch
        _Class:_CloseError ->
            ok
    end,

    ok.


%% ============================================================
%% CODE UPGRADE
%% ============================================================

code_change(_OldVersion, State, _Extra) ->
    {ok, State}.
