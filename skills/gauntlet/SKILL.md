---
name: gauntlet
description: The polish loop — fan out worker+blind-critic pairs and iterate an existing build against a bar until it holds — with the three rails the viral version omits, a bar made of floor+reference+axes instead of "utterly wowed," a published budget and cut order instead of "don't stop," and a seam pass instead of trusting pairwise-passed parts. Load when an MVP or spec exists and the ask is "make this excellent." Companion to foreman (which staffs the build this loop polishes).
---

# Gauntlet — the polish loop, with rails

The three-line prompt pattern that went viral in mid-2026 as the "gauntlet loop"
(Matt Shumer's name): give the agent a **task**, a **build method** — fan out
subagents, each checked by a separate critic — and a **bar** — "do not stop
until each critic is utterly wowed compared to <a reference>." It one-shots
game demos and 3D walkthroughs that look extraordinary, and the *shape* is
right: worker+critic pairs are [fan-out](../fan-out/SKILL.md)'s law (no
instrument points at its own author's blind spot), and iterate-until-green is
what [grindability](../grindability/SKILL.md) calls the compounding case —
infinitely re-attemptable work under a cheap judge.

Run as written, though, it fails three of this pack's laws at once. This skill
is the corrected loop: same three lines, plus the rails.

## Kinship: foreman builds, gauntlet polishes

[foreman](../foreman/SKILL.md) staffs a build from a spec — the boss writes the
constitution, dispatches workers, blind-verifies once per unit, merges. The
gauntlet is foreman's blind-verify move **promoted to the drivetrain**: the
build already exists, and worker+critic pairs go around the loop until the bar
holds. Use foreman to get to a working MVP; use the gauntlet to make that MVP
excellent. Same seats, same blind-verify discipline, same dispute rule
(nothing outranks the check) — different engine.

## Rail 0 — the loop polishes; it cannot aim

The strongest caveat comes from the pattern's own users: a gauntlet pointed at
a weak or absent MVP optimizes beautifully toward the wrong thing. The loop
sharpens whatever direction it is given — it never chooses one. So it starts
from something that already carries intent: a working build, a design system, a
spec, the child's drawing. If none exists, that is
[vision-interview](../vision-interview/SKILL.md) /
[elicit-taste](../elicit-taste/SKILL.md) work, and it comes first. The sheet is
the spec; the gauntlet is the sander.

## Rail 1 — the bar is an instrument, not a vibe

"Utterly wowed" is [oracle-craft](../oracle-craft/SKILL.md)'s mirror wearing a
judge's robe: an unanchored critic told to be wowed drifts toward the axis the
builder optimized, and two runs return two verdicts. It *feels* strict and
measures nothing. A real bar has three parts, checked in this order:

1. **Floor — deterministic, runs first.** Build passes, app boots, zero
   console errors, the smoke suite, measured thresholds (frame rate, load
   time, overflow at N viewports). No critic's judgment is spent on what a
   script can catch. If no floor exists, build it before looping —
   [oracle-craft](../oracle-craft/SKILL.md) has the design rules.
2. **Reference — the peg.** Photos, the actual game being matched, the brand's
   design system. A critic never judges "good"; it judges "matches the
   reference on my axis, or fails with the measured difference." The demo's
   best artifact was exactly this: a peg-vs-actual report, reference beside
   render, self-marked failed with reasons. Keep that report — it is the
   round's act→look evidence.
3. **Axes — one per critic, never the builder's.** Visual fidelity, behavior
   under input, performance, fidelity-to-spec — assigned so that no critic
   judges along the axis its worker optimized toward. Distinct lenses catch
   what redundant enthusiasm cannot.

## Rail 2 — publish the budget and the cut order before round one

"Do not stop until wowed" is an unbounded burn — the demo runs went two hours
with no ceiling. Every loop gets, up front: a **round cap**, a **spend/time
cap**, and a **no-progress rule** — a round that improves no failing axis on
its measures means stop and report, not churn (a loop marinating in its own
failure converges on the same wrong idea; foreman's two-bounce rule applies to
rounds too). And because the budget can run out mid-polish, the order of
sacrifice is written *before* anyone is tired:
[cut-order](../cut-order/SKILL.md) — what degrades first, what is load-bearing.

## Rail 3 — the seam pass

A fleet of pairwise-passed parts can still not compose — the gap between two
polished rooms belongs to nobody by construction
([own-the-seam](../own-the-seam/SKILL.md)), and the full-context read is the
ceiling of the whole pattern (foreman's shepherd law). After the last round,
one integration pass over the assembled whole, against the original intent,
by a reader holding all of it. Then the report: what the critics caught, what
bounced, what was cut, what the seam pass found that no pair could.

## The assembled prompt

```
TASK: polish <the existing build/MVP — name it> to <the stated intent>.

BUILD METHOD: break the goal into the smallest independently-checkable parts.
Fan out one worker per part, each paired with a blind critic that receives
the artifact and the bar below — never the worker's claims. Each round,
produce a peg-vs-actual report: reference beside actual per part, pass/fail
with the measured reason.

THE BAR (in order):
1. Floor: <build passes · boots · zero console errors · smoke green · metric
   thresholds>. Deterministic, runs before any critic.
2. Reference: <the peg>. Critics judge "matches the reference on my axis,"
   never "good."
3. Axes, one critic each: <visual fidelity · behavior · performance ·
   fidelity-to-spec>. No critic judges its worker's own axis.

BUDGET AND CUT ORDER: at most <N> rounds or <cap>, whichever first. A round
with no measured improvement on any failing axis = stop and report. If the
budget ends mid-polish, sacrifice in this order: <cut order>.

SEAM: after the last round, one full-context pass over the assembled whole
against the original intent. Close with the report: caught, bounced, cut,
and what the seam pass found.
```

## When NOT to load

- **No MVP and no reference** — the loop cannot aim (Rail 0); do the vision
  work first.
- **Ungrindable work** — each attempt touches the world (live sends, rate
  limits, one-shot state): no loops, human cadence.
- **Intent-heavy prose or voice** — taste belongs to the human; a critic loop
  converges on generic. [human-in-the-loop](../human-in-the-loop/SKILL.md)
  bins apply unchanged.
