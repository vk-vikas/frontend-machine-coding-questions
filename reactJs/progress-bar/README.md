# Progress Bar — Machine Coding Cheat Sheet

## State

- `percent` → number (clamped progress value)

## Props

- `value` → external progress input
- `onComplete` → callback when max reached

## Core Logic

- clamp value between MIN and MAX
- update internal percent on prop change
- trigger completion when value hits max

## Handlers

- none (fully driven by props)

## Render

- progress container
- scaled inner bar
- percentage label

## Constraints / Rules

- clamp out-of-range values
- support completion callback
- accessible via ARIA attributes

## Revision Cue
