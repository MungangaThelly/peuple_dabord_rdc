
-module(pd_petition_statem_tests).
-include_lib("eunit/include/eunit.hrl").

petition_lifecycle_test() ->
    {ok, _StartedApps} = application:ensure_all_started(pd_core),

    try
        %% Reset the dedicated test petition.
        {ok, 1} = pd_db:query(
            "UPDATE petitions SET status = 'draft' WHERE id = $1",
            [1]
        ),

        %% Start the state machine using the PostgreSQL ID.
        {ok, Pid} = pd_petition_statem:start_link(<<"1">>),

        try
            ?assertEqual(
                #{state => draft, petition_id => 1},
                pd_petition_statem:get_status(Pid)
            ),

            ?assertEqual(
                {ok, submitted},
                pd_petition_statem:command(Pid, submit)
            ),

            ?assertEqual(
                {ok, under_review},
                pd_petition_statem:command(Pid, start_review)
            ),

            ?assertEqual(
                {ok, published},
                pd_petition_statem:command(Pid, publish)
            ),

            ?assertEqual(
                {error, invalid_transition},
                pd_petition_statem:command(Pid, transmit)
            ),

            %% Verify persistence in PostgreSQL.
            {ok, _Columns, [{<<"published">>}]} = pd_db:query(
                "SELECT status FROM petitions WHERE id = $1",
                [1]
            )	
        after
            gen_statem:stop(Pid)
        end
    after
        %% Restore the dedicated test petition.
        _ = pd_db:query(
            "UPDATE petitions SET status = 'draft' WHERE id = $1",
            [1]
        ),
        application:stop(pd_core)
    end.
