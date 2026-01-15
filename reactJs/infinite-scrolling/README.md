# Infinite Scroll (Intersection Observer) — Machine Coding Cheat Sheet

## State

- `list` → array (loaded items)
- `page` → number (pagination cursor)
- `loading` → boolean (fetch in progress)
- `hasMore` → boolean (more data available)

## Refs

- `observerRef` → IntersectionObserver instance

## Core Logic

- fetch paginated data on `page` change
- append new data to list
- observe last item to trigger next page load

## Handlers

- data fetch with loading + hasMore guard
- observer callback → increment page when intersecting

## Render

- render list items
- attach ref to last item
- show loading indicator

## Cleanup

- disconnect observer before re-observing

## Revision Cue
