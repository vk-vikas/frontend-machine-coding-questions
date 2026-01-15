# Cinema Hall Booking — Machine Coding Cheat Sheet

## State

- `selected` → array (currently selected seat IDs)

## Derived / Memoized Data

- seat type → color map
- row → seat type map
- total price from selected seats

## Core Logic

- map rows → seat types
- generate seat ID from row + column
- toggle seat selection (ignore already booked)
- compute total price based on seat type

## Handlers

- select / deselect seat
- complete booking callback with seats + total

## Render

- seat grid (rows, aisle split)
- legend for seat types
- selected seats summary
- total price + confirm button

## Constraints / Rules

- booked seats are disabled
- price depends on seat row/type
- aisle splits seats visually

## Revision Cue
