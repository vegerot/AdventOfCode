#!/usr/bin/env wolframscript
OpCompute[noun_,verb_]:=
        360000*noun+verb+250635
res=Solve[OpCompute[noun,verb]==19690720, {noun,verb}, Integers]
Print[res]
min = Minimize[Abs[100*noun + verb /. res], C[1]]
Print[{noun,verb}/.res/.min[[2]]]
Print[min]
