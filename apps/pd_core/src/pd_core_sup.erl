-module(pd_core_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    PetitionSupervisor = #{
        id => pd_petition_sup,
        start => {pd_petition_sup, start_link, []},
        restart => permanent,
        shutdown => infinity,
        type => supervisor,
        modules => [pd_petition_sup]
    },
    {ok, {{one_for_one, 5, 10}, [PetitionSupervisor]}}.
