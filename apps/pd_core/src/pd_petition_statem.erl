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

init(PetitionId) ->
    {ok, draft, #{petition_id => PetitionId}}.

callback_mode() ->
    handle_event_function.

handle_event({call, From}, get_status, State, Data) ->
    {keep_state_and_data,
     [{reply, From, #{state => State, petition_id => maps:get(petition_id, Data)}}]};
handle_event({call, From}, submit, draft, Data) ->
    transition(From, submitted, Data);
handle_event({call, From}, start_review, submitted, Data) ->
    transition(From, under_review, Data);
handle_event({call, From}, publish, under_review, Data) ->
    transition(From, published, Data);
handle_event({call, From}, close, published, Data) ->
    transition(From, closed, Data);
handle_event({call, From}, transmit, closed, Data) ->
    transition(From, transmitted, Data);
handle_event({call, From}, start_follow_up, transmitted, Data) ->
    transition(From, follow_up, Data);
handle_event({call, From}, reject, State, Data)
  when State =:= submitted; State =:= under_review ->
    transition(From, rejected, Data);
handle_event({call, From}, withdraw, State, Data)
  when State =:= draft; State =:= submitted; State =:= under_review;
       State =:= published ->
    transition(From, withdrawn, Data);
handle_event({call, From}, archive, State, Data)
  when State =:= closed; State =:= transmitted; State =:= follow_up;
       State =:= rejected; State =:= withdrawn ->
    transition(From, archived, Data);
handle_event({call, From}, _Command, _State, _Data) ->
    {keep_state_and_data, [{reply, From, {error, invalid_transition}}]};
handle_event(_Type, _Event, _State, _Data) ->
    keep_state_and_data.

transition(From, NewState, Data) ->
    %% Prototype only: persist and authorize this transition before replying
    %% in any production implementation.
    {next_state, NewState, Data,
     [{reply, From, {ok, NewState}}]}.

terminate(_Reason, _State, _Data) ->
    ok.

code_change(_OldVsn, State, Data, _Extra) ->
    {ok, State, Data}.
