# Stopwatch — Machine Coding Cheat Sheet

## State
- `elapsedTime` → number (source of truth for time)
- `isRunning` → boolean (controls stopwatch state)

## Refs
- `startTimeRef` → start timestamp (no re-render)
- `animationRef` → requestAnimationFrame id

## Core Loop
- update time using: `Date.now() - startTimeRef`
- run via `requestAnimationFrame`

## Handlers
- start → init start time, start RAF loop
- pause → cancel RAF
- reset → cancel RAF, reset time

## Render
- time display (formatted)
- start / pause / reset buttons

## Cleanup
- cancel RAF on unmount

## Revision Cue