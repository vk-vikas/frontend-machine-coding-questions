# Traffic Light — Machine Coding Cheat Sheet

## State
- `activeIndex` → number (current light in sequence)

## Refs
- `timeoutRef` → timeout id (timer control)

## Core Logic
- sort sequence by `lightUpOrder` → timing control
- sort sequence by `renderOrder` → layout control
- advance `activeIndex` after `duration`

## Handlers
- auto-advance using `setTimeout`
- cycle index modulo sequence length

## Render
- map layout sequence
- activate light by matching current color

## Cleanup
- clear timeout on re-run / unmount

## Revision Cue