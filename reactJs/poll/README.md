# Poll Widget — Machine Coding Cheat Sheet

## State

- `options` → array (poll options with votes)
- `selected` → array (selected option ids)
- `hasVoted` → boolean (vote submitted)

## Derived / Memoized Data

- total votes count
- vote percentage per option

## Core Logic

- select option(s) (single or multiple)
- increment votes on submit
- decrement votes on re-vote
- compute percentages from total votes

## Handlers

- select / deselect option
- submit vote
- re-vote

## Render

- options list (radio / checkbox)
- vote percentages + progress bars (after vote)
- vote / re-vote button

## Constraints / Rules

- disable selection after voting
- at least one option required to vote
- multi vs single selection supported

## Revision Cue
