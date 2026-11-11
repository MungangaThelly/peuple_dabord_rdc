-module(pd_petition_statem_tests).
-include_lib("eunit/include/eunit.hrl").

petition_lifecycle_test() ->
    {ok, Pid} = pd_petition_statem:start_link(<<"PD-TEST-1">>),
    ?assertEqual(#{state => draft, petition_id => <<"PD-TEST-1">>},
                 pd_petition_statem:get_status(Pid)),
    ?assertEqual({ok, submitted}, pd_petition_statem:command(Pid, submit)),
    ?assertEqual({ok, under_review}, pd_petition_statem:command(Pid, start_review)),
    ?assertEqual({ok, published}, pd_petition_statem:command(Pid, publish)),
    ?assertEqual({error, invalid_transition},
                 pd_petition_statem:command(Pid, transmit)),
    gen_statem:stop(Pid).
