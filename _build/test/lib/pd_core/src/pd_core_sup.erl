
-module(pd_core_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    DatabaseWorker = #{
        id => pd_db,
        start => {pd_db, start_link, []},
        restart => permanent,
        shutdown => 5000,
        type => worker,
        modules => [pd_db]
    },

    PetitionSupervisor = #{
        id => pd_petition_sup,
        start => {pd_petition_sup, start_link, []},
        restart => permanent,
        shutdown => infinity,
        type => supervisor,
        modules => [pd_petition_sup]
    },

    {ok, {{one_for_one, 5, 10},
          [DatabaseWorker, PetitionSupervisor]}}.
