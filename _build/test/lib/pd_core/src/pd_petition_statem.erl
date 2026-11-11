
-module(pd_petition_statem).
-behaviour(gen_statem).

-export([start_link/1, command/2, get_status/1]).
-export([init/1, callback_mode/0, handle_event/4,
         terminate/3, code_change/4]).

start_link(PetitionId) when is_binary(PetitionId) ->
    gen_statem:start_link(?MODULE, PetitionId, []).

command(Pid, Command) ->
    gen_statem:call(Pid, Command).

get_status(Pid) ->
    gen_statem:call(Pid, get_status).

%% Load the petition state from PostgreSQL.
init(PetitionIdBinary) ->
    case parse_petition_id(PetitionIdBinary) of
        {ok, PetitionId} ->
            Sql = "SELECT status FROM petitions WHERE id = $1",
            case pd_db:query(Sql, [PetitionId]) of
                {ok, _Columns, [{StatusBinary}]} ->
                    case status_atom(StatusBinary) of
                        {ok, State} ->
                            {ok, State, #{petition_id => PetitionId}};
                        error ->
                            {stop, {unknown_database_status, StatusBinary}}
                    end;
                {ok, _Columns, []} ->
                    {stop, {petition_not_found, PetitionId}};
                {error, Reason} ->
                    {stop, {database_error, Reason}};
                Other ->
                    {stop, {unexpected_database_result, Other}}
            end;
        error ->
            {stop, invalid_petition_id}
    end.


callback_mode() ->
    handle_event_function.

handle_event({call, From}, get_status, State, Data) ->
    Reply = #{
        state => State,
        petition_id => maps:get(petition_id, Data)
    },
    {keep_state_and_data, [{reply, From, Reply}]};

handle_event({call, From}, submit, draft, Data) ->
    transition(From, draft, submitted, Data);

handle_event({call, From}, start_review, submitted, Data) ->
    transition(From, submitted, under_review, Data);

handle_event({call, From}, publish, under_review, Data) ->
    transition(From, under_review, published, Data);

handle_event({call, From}, close, published, Data) ->
    transition(From, published, closed, Data);

handle_event({call, From}, transmit, closed, Data) ->
    transition(From, closed, transmitted, Data);

handle_event({call, From}, start_follow_up, transmitted, Data) ->
    transition(From, transmitted, follow_up, Data);

handle_event({call, From}, reject, State, Data)
  when State =:= submitted; State =:= under_review ->
    transition(From, State, rejected, Data);

handle_event({call, From}, withdraw, State, Data)
  when State =:= draft; State =:= submitted;
       State =:= under_review; State =:= published ->
    transition(From, State, withdrawn, Data);

handle_event({call, From}, archive, State, Data)
  when State =:= closed; State =:= transmitted;
       State =:= follow_up; State =:= rejected;
       State =:= withdrawn ->
    transition(From, State, archived, Data);

handle_event({call, From}, _Command, _State, _Data) ->
    {keep_state_and_data,
     [{reply, From, {error, invalid_transition}}]};

handle_event(_Type, _Event, _State, _Data) ->
    keep_state_and_data.


%% Persist the status change and audit event atomically.
transition(From, CurrentState, NewState, Data) ->

    PetitionId = maps:get(petition_id, Data),

    CurrentStatus = atom_to_binary(CurrentState, utf8),
    NewStatus = atom_to_binary(NewState, utf8),

    UpdateSql =
        "UPDATE petitions "
        "SET status = $1, updated_at = NOW() "
        "WHERE id = $2 AND status = $3 "
        "RETURNING reference, status",

    AuditSql =
        "INSERT INTO audit_logs "
        "(actor_id, event_type, entity_type, entity_id, details) "
        "VALUES (NULL, $1, 'petition', $2, "
        "jsonb_build_object("
        "'actor_type', 'system', "
        "'reference', $3::text, "
        "'from_status', $4::text, "
        "'to_status', $5::text"
        "))",

    TransactionFun = fun(Connection) ->

        case epgsql:equery(
            Connection,
            UpdateSql,
            [NewStatus, PetitionId, CurrentStatus]
        ) of

            {ok, 1, _Columns, [{Reference, PersistedStatus}]}
              when PersistedStatus =:= NewStatus ->

                case epgsql:equery(
                    Connection,
                    AuditSql,
                    [
                        <<"petition.status_changed">>,
                        PetitionId,
                        Reference,
                        CurrentStatus,
                        NewStatus
                    ]
                ) of

                    {ok, 1} ->
                        NewState;

                    {error, AuditReason} ->
                        {error, {audit_insert_failed, AuditReason}};

                    OtherAuditResult ->
                        {error, {unexpected_audit_result, OtherAuditResult}}
                end;

            {ok, 0, _Columns, []} ->
                {error, state_conflict};

            {error, UpdateReason} ->
                {error, {petition_update_failed, UpdateReason}};

            OtherUpdateResult ->
                {error, {unexpected_update_result, OtherUpdateResult}}
        end
    end,

    case pd_db:transaction(TransactionFun) of

        {ok, NewState} ->
            {next_state, NewState, Data,
             [{reply, From, {ok, NewState}}]};

        {error, {transaction_rolled_back, state_conflict}} ->
            {stop_and_reply, state_conflict,
             [{reply, From, {error, state_conflict}}]};

        {error, Reason} ->
            {keep_state_and_data,
             [{reply, From, {error, {database_error, Reason}}}]};

        Other ->
            {keep_state_and_data,
             [{reply, From, {error, {unexpected_transaction_result, Other}}}]}
    end.


%% Accept only a positive numeric PostgreSQL ID.
parse_petition_id(Binary) ->
    try binary_to_integer(Binary) of
        Id when Id > 0 ->
            {ok, Id};
        _ ->
            error
    catch
        error:badarg ->
            error
    end.

%% Explicit mapping: never create atoms from database input.
status_atom(<<"draft">>) -> {ok, draft};
status_atom(<<"submitted">>) -> {ok, submitted};
status_atom(<<"under_review">>) -> {ok, under_review};
status_atom(<<"published">>) -> {ok, published};
status_atom(<<"rejected">>) -> {ok, rejected};
status_atom(<<"closed">>) -> {ok, closed};
status_atom(<<"transmitted">>) -> {ok, transmitted};
status_atom(<<"follow_up">>) -> {ok, follow_up};
status_atom(<<"withdrawn">>) -> {ok, withdrawn};
status_atom(<<"archived">>) -> {ok, archived};
status_atom(_) -> error.

terminate(_Reason, _State, _Data) ->
    ok.

code_change(_OldVsn, State, Data, _Extra) ->
    {ok, State, Data}.
