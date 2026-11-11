{application,pd_core,
             [{description,"PEUPLE D'ABORD - RDC core platform"},
              {vsn,"0.2.0"},
              {registered,[pd_core_sup,pd_db,pd_petition_sup]},
              {mod,{pd_core_app,[]}},
              {applications,[kernel,stdlib,epgsql]},
              {env,[{environment,development}]},
              {modules,[pd_core_app,pd_core_sup,pd_db,pd_petition_statem,
                        pd_petition_sup]}]}.
