:- dynamic event/3.

prolog_trace_interception(Port, Frame, _Choice, continue) :-
    prolog_frame_attribute(Frame, goal, Goal),
    prolog_frame_attribute(Frame, level, Level),
    assertz(event(Port, Level, Goal)).

run(File, Query) :-
    retractall(event(_,_,_)),
    consult(File),
    trace,
    call(Query),
    notrace,
    forall(event(P,L,G),
        format('~w|~w|~w~n',[P,L,G])).