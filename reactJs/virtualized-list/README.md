# Virtualized List — Machine Coding Cheat Sheet

## State

- `scrollTop` → number (current scroll position)

## Refs

- `scrollRef` → scroll container DOM ref

## Core Logic

- calculate visible window using `scrollTop` + `itemHeight`
- render only items between `startIndex` and `endIndex`
- fake full height container to enable scrolling

## Handlers

- scroll listener → update `scrollTop`

## Render

- scrollable container
- inner spacer with total height
- absolutely positioned visible items

## Cleanup

- remove scroll listener on unmount

## Revision Cue
