# Multi-Select Dropdown — Machine Coding Cheat Sheet

## State
- `isOpen` → boolean (dropdown visibility)
- `search` → string (filter input)
- `selected` → array (selected options)

## Refs
- `ref` → container ref (outside click detection)

## Core Logic
- derive options by filtering with `search`
- toggle option in `selected` array (add / remove)
- emit selected values via `onChange`

## Handlers
- toggle dropdown open / close
- update search input
- select / deselect option
- remove selected tag
- close on outside click

## Render
- trigger container with selected tags / placeholder
- conditional dropdown panel
- search input
- filtered option list

## Cleanup
- remove document click listener on unmount

## Revision Cue