# Star Rating — Machine Coding Cheat Sheet

## State

- `hoveredRating` → number (UI hover feedback)

## Props

- `rating` → selected value (controlled)
- `size` → number of stars
- `onChange` → emit selected rating

## Core Logic

- derive star state from hover or selected rating
- hover takes precedence over selected value

## Handlers

- hover in / out → update hovered rating
- click → emit rating change

## Render

- map stars based on size
- apply active / hover styles

## Constraints / Rules

- controlled component
- visual feedback without mutating rating

## Revision Cue
