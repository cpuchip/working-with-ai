---
name: wayfinder
description: Plan work too big and too foggy for one session — a shared MAP of decision tickets with a named destination, a frontier of decidable questions, and fog tracked honestly. Use when an idea is ambitious and the way isn't visible ("I want X but no idea how"), for engineering or anything else (a course, an event, a build-out). NOT for work plannable in one sitting — if the way is clear, just go. Adapted from Matt Pocock's wayfinder (github.com/mattpocock/skills, MIT).
---

# Wayfinder — clear the fog, one decision at a time

A loose, ambitious idea has arrived and the way to it isn't visible. Wayfinding
charts a **map** of **decision tickets** — questions whose resolution is a
decision, not slices of a build — and works them one session at a time until
nothing is left to decide before someone goes and does the thing.

**Plan, don't do.** The pull to just start building is the signal you've
reached the map's edge — hand off to the build machinery instead
([foreman](../foreman/SKILL.md), working groups, the project's own
[cut order](../cut-order/SKILL.md)).

## The destination comes first

Naming the destination is the first act — it fixes the scope and shapes every
ticket. A spec, a locked decision, a founded project, a family evening. Where
the work has an audience, name the **usable moment** (who is in front of it and
what they do), never the roadmap — see
[ship-the-working-build](../ship-the-working-build/SKILL.md).

## The map

One durable artifact per effort. Two homes, pick at charting:

- **Local markdown** (default): `<project>/maps/<slug>/map.md` +
  `tickets/NNN-<name>.md`. Fits a file-first culture; greppable, replayable,
  survives every tracker. **Tickets never move; state lives in frontmatter** —
  a path is an identity, and identities that change break every link that
  carried them (folder-per-status kanban rots the map's own references).
  Frontmatter: `title` · `type: grilling|research|prototype|task` ·
  `status: open|done|out-of-scope` · `blocked_by: [NNN-slug, …]` ·
  `claimed_by: <who>`. The answer goes in a `## Resolution` section on the
  ticket. **The board view is rendered, not curated:**
  `node skills/wayfinder/board.mjs <map-dir>` prints destination, frontier,
  claimed, blocked (with what blocks), fog, and counts — validates referential
  integrity and done-without-resolution, exits 1 on violations, and announces
  both zero-tickets and map-complete out loud.
- **Issue tracker** (for repos that live on one and want the phone UI):
  map = parent issue labelled `wayfinder:map`, tickets = sub-issues, blocking
  via the tracker's native relationships so the frontier renders visually.

The map is an **index, not a store**: Destination · Notes (skills/standing
prefs for this effort) · **Decisions so far** (one line per closed ticket +
link — the ticket holds the detail) · **Not yet specified** (the fog) ·
**Out of scope** (ruled past the destination; never graduates).

**Refer by name, never bare number.** A wall of #42/#43 is illegible; names
read at a glance and carry their links.

## Ticket types — and how each gets worked

Every ticket is **HITL** (worked live with the human — the agent NEVER answers
their side; a grilling that answers its own questions is broken) or **AFK**
(agent-driven).

| type | mode | instrument |
|---|---|---|
| **grilling** | HITL | one question at a time, recommended answer attached (see [vision-interview](../vision-interview/SKILL.md) for the ladder). Route by shape: live chat · **voice** for the wandering kind · **your async approval surface** for discrete, answerable-as-written decisions — their device, their pace, and the escalation test applies |
| **research** | AFK | fire immediately, in parallel — one agent per ticket ([fan-out](../fan-out/SKILL.md)); findings land as an artifact linked from the ticket, never pasted in |
| **prototype** | HITL | the probe/spike habit: cheap, concrete, reactable. One night's build kept a `probes/` directory whose *first* probe existed only to prove the rig could see the failure — before anything tried to fix it. Prototypes are the anti-waterfall valve: low-fi map, hi-fi feedback |
| **task** | either | real-world unblockers (sign up, provision, move data). The one type that DOES — and it earns its place by unblocking a decision, not by delivering the destination |

**Facts vs decisions** (grilling's core law): if a fact is findable — in the
repo, the corpus, the web — look it up; never spend their answer on it. The
decisions are theirs, one at a time, each with your recommended answer stated.

## Frontier, fog, claims

- A ticket exists when the **question can be stated precisely now** — even if
  blocked. Fog ("Not yet specified") is what can't be phrased that sharply
  yet; don't pre-slice it — one patch may graduate into several tickets or
  none.
- The **frontier** = open, unblocked, unclaimed tickets. Resolving one moves
  it and may graduate fog.
- **Claims**: when several agents share a map, claim the ticket on your shared
  channel before working it — a claim in flight isn't a claim received (see
  [room-norms](../room-norms/SKILL.md)). Solo, assignment or a `claimed_by`
  line suffices.
- **One ticket per session** (research excepted — those fan out). Charting is
  itself one session's work and hand-resolves nothing.
- Resolutions are recorded ON the ticket (the answer + links to assets), the
  map gets the one-line gist. A decision lives in exactly one place.
- Out-of-scope discoveries get **closed** with one line and a reason — the
  route walked stays clean of scope boundaries.

## Working a map

Invoke with the map (path/URL) and optionally a ticket. Load the map's low-res
view — zoom into ticket bodies only as needed. Choose (user's pick, else first
frontier ticket), claim, resolve via the type's instrument, record, then
graduate fog / add newly-surfaced tickets / invalidate what the answer killed.
Expect parallel sessions; the tracker (or claims) is the coordination surface.

## When the map completes

Nothing left to decide → compile: **map → spec/VISION** (dense, every line
linking back to its decision ticket — the primary sources stay reachable) →
the build machinery (a [foreman](../foreman/SKILL.md) constitution + tickets,
working groups, the cut). Specs here are **destination documents, not
shrines**: once the decisions live in the code and its tests, the spec may
close. The map's decision tickets ARE the durable record.

## House riders

- **A word doing unpinned work in prose will be pinned by whoever implements
  it** — resolutions state BOTH terms; a predicate looks decided in a way
  prose doesn't ([pin-both-terms](../pin-both-terms/SKILL.md)).
- **A deferral needs a watcher** — any "later" written into a resolution names
  its re-check condition, or lands on the unenforced-invariant register
  ([oracle-craft](../oracle-craft/SKILL.md)).
- Escalation-test every HITL ticket bound for an async approval surface: aimed
  at the right noun, answerable as written
  ([human-in-the-loop](../human-in-the-loop/SKILL.md)).
- The map is a board, and **a board is a cache** — re-read the map's claims
  against the tickets before building on them in a new session.

*Adapted from Matt Pocock's `wayfinder`, `grilling`, and `to-spec` skills
(github.com/mattpocock/skills, MIT). See `PROVENANCE.md` in this directory.*
