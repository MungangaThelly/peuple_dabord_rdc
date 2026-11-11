-module(pd_petition_sup).
-behaviour(supervisor).

-export([start_link/0, start_petition/1, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

start_petition(PetitionId) when is_binary(PetitionId) ->
    Child = #{
        id => {petition, PetitionId},
        start => {pd_petition_statem, start_link, [PetitionId]},
        restart => temporary,
        shutdown => 5000,
        type => worker,
        modules => [pd_petition_statem]
    },
    supervisor:start_child(?MODULE, Child).

init([]) ->
    {ok, {{one_for_one, 10, 10}, []}}.
