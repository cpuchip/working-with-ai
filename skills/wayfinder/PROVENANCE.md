Adapted 2026-08-01 from Matt Pocock's `wayfinder` skill (plus ideas from the
companion `grilling` and `to-spec` skills) at
https://github.com/mattpocock/skills — MIT, Copyright (c) 2026 Matt Pocock,
LICENSE included.

**Not a verbatim vendoring.** SKILL.md is a rewrite that keeps upstream's core
shape and vocabulary — destination, map, decision tickets, frontier, fog,
out-of-scope, compile-to-spec — and layers local additions on top:

- Ticket state in frontmatter with tickets that never move (upstream's
  folder-per-status board rots its own links).
- The HITL/AFK split and the four ticket types (`grilling`, `research`,
  `prototype`, `task`) with an instrument named per type.
- The facts-vs-decisions law: look up anything findable; spend the human's
  answer only on decisions.
- The house riders section, cross-linked to the rest of this pack.

`board.mjs` is **local, not upstream** — written for this pack and licensed
under the repo's own MIT LICENSE. It renders the board from ticket frontmatter
and doubles as the map's oracle: it validates referential integrity in
`blocked_by`, flags any `status: done` ticket with no `## Resolution` section,
exits 1 on violations, and says "zero tickets" out loud rather than exiting
clean on an empty directory.

Refresh = re-read upstream and re-evaluate the local additions; note any
further modifications here.
