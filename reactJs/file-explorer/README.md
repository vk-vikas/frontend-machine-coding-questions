# File Explorer (Tree) — Machine Coding Cheat Sheet

## State

- `tree` → nested object (file/folder hierarchy)
- `expanded` → boolean (folder open/close)
- `editing` → boolean (rename mode)
- `name` → string (temp rename value)

## Core Logic

- recursive tree traversal for insert / rename / delete
- insert only into folders
- immutable updates at every level

## Handlers

- insert node (file / folder)
- rename node
- delete node
- toggle folder expand
- toggle edit mode

## Render

- recursive node rendering
- folder expand / collapse
- inline rename input
- add / delete controls

## Constraints / Rules

- tree is immutable
- recursion for all mutations
- files cannot have children

## Revision Cue
