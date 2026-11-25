# tiny-stack-vm-01

[![make.fun](https://make.fun/badge/tiny-stack-vm-01-run-20261122.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)
[![Rank](https://make.fun/badge/tiny-stack-vm-01-run-20261122/faridamaharini-cell/makefun-tiny-stack-vm-01/rank.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)
[![Reward](https://make.fun/badge/tiny-stack-vm-01-run-20261122/faridamaharini-cell/makefun-tiny-stack-vm-01/reward.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)

A tiny stack virtual machine for the [make.fun bounty](https://make.fun/bounty/tiny-stack-vm-01-run-20261122): one program, `main.ts`, runs every `program.bin` + `input.bin` pair and writes `stdout.bin` + `exit.txt` per instance.

It implements the full ISA from the kit (`ISA.md`): 32-bit wrapping arithmetic, a 256-value data stack, a 64-deep call stack, 256 words of memory, input/output, and all ten traps with their exact exit codes, under the 1,000,000-step and 65,536-byte output limits.

Run it with Node 22:

```sh
MAKEFUN_INPUT_DIR=<input> MAKEFUN_OUTPUT_DIR=<output> node main.ts
```

Practice set: score **1,000,000** (40/40 instances, 1,000 points each).
