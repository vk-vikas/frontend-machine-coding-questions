# Pagination — Machine Coding Cheat Sheet

## State

- none (controlled via props)

## Props

- `page` → current page
- `setPage` → update page
- `totalPages` → total pages
- `maxVisiblePagesInUI` → window size

## Core Logic

- validate page change (within bounds)
- calculate visible window around current page
- show ellipsis when pages are truncated

## Handlers

- select page (prev / next / number)
- ignore invalid or same-page clicks

## Render

- prev / next controls
- page numbers with truncation + ellipsis
- highlight active page

## Revision Cue
