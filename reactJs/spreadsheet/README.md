# Spreadsheet Grid — Machine Coding Cheat Sheet

## State

- `data` → 2D array (cell values)
- `selected` → { row, col } (active cell)
- `editing` → boolean (edit mode)

## Refs

- `containerRef` → grid container (keyboard focus control)

## Core Logic

- update cell value immutably
- navigate selection via arrow keys (clamped to grid)
- enter edit mode on Enter
- exit edit mode on blur / navigation

## Handlers

- cell click → update selection
- keydown → navigate / toggle edit
- input change → update cell data

## Render

- table with row/column headers
- selected cell highlight
- input only for selected + editing cell

## Constraints / Rules

- no direct state mutation
- keyboard navigation first-class
- restore focus after editing

## Revision Cue
