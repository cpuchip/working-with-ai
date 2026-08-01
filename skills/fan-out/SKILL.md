---
name: fan-out
description: Parallelize a large task across many subagents — when the work is independent per-unit (verify / research / generate, the same operation across N files or items) it is a fan-out shape, and parallel fresh-eyes-per-unit beats one tiring serial operator. Use to triage whether a long task should be fanned out, and to run the fan-out safely under an active presiding watch (e.g., a 62-file audit fanned to 6 agents finished in ~15 min and was more thorough than the serial walk that preceded it).
---

# Fan-Out

## The triage (do this BEFORE starting any task with >~20 independent units)

Ask one question: **what is the SHAPE of this work?**

- **Fan-out shape** — independent, per-unit, the same operation across many units
  (verify N files against sources, research N videos, generate N stubs). No unit
  needs another unit's result. → **Fan out.** Parallel speedup *and* a higher
  quality ceiling: fresh eyes per unit beat one operator who accumulates blind
  spots ("I already know the pattern, I'll stop re-checking").
- **Single-pass shape** — centralizable (one known pattern, deterministic to
  locate — e.g. "remove all the X notes"), or sequentially dependent (each step
  needs the last). → **One careful pass.** Fan-out here just adds coordination,
  consistency risk, and review cost without improving the output.

The classic miss: a verification *walk* across hundreds of files run serially
for days because "just do the next file" momentum never triggered the triage.
It was a textbook fan-out shape. **Surface the triage result before starting** —
a quick "this is ~N independent units; I'd fan it out / I'd do it single-pass
because ___."

## Why fan-out has a higher ceiling on verification (the refined principle)

"The full-context shepherd is the ceiling" is only half true:
- **Shepherd-for-integration** — one full-context mind is the ceiling for
  *cross-cutting* issues (a race spanning files, a thesis contradicting another
  document). Fan-out can't see those.
- **Fan-out-for-independent-verification** — for *per-unit* checks, parallel
  fresh eyes BEAT one accumulating operator. They are complementary, not rivals.

### The structural argument (stronger than the fatigue one)

Everything above argues from an operator who *tires*. The deeper reason is that a
rested operator would not help, because the gap is not attention:

> **A person cannot build an instrument aimed at their own blind spot, because the
> blind spot is precisely where they don't think one is needed.**

Measured on one night's build where eight agents each built gates aimed at their own
known risks: **every gate was blind in the same direction — toward the sentences its
author was most confident about.** The engine's gates proved contraction, loop bounds,
and replay; all green, all true, and blind to a comment that lied, a view that was
empty, and a constant that made the whole thing winnable in sixty seconds with no
input from the user at all. One agent's rule for legibility was the single number they
had published as *arithmetic, not taste* — so it was the one they never re-checked, and
it held at exactly one screen size.

Every real catch that night came from someone reading **another sphere's** artifact.
**What makes a second witness *second* is where it stands, not how careful it is** — which
is why fresh-eyes-per-unit is a structural property of the shape, not a hope about the
agents you spawn.

And **writing the principle down grants no immunity.** One agent wrote "every oracle I
built proves the sim is correct, not one proves it's fun" hours before setting the
constant that proved exactly that. What the sentence bought was the habit of running one
more measurement, and the habit is what found it.

**Serial-probe, then parallel-scale.** A short serial pass finds the pattern
(e.g. "the dominant defect is quotes drawn from the wrong edition of the
source; also check the citations *inside* entries"). Then front-load that
knowledge into the fan-out spec so the parallel agents inherit the shepherd's
accumulated context without the blind spot.

## The recipe

1. **Enumerate + batch.** List the units; split into N batches (aim ~10-14
   units/agent; balance by weight, not just count).
2. **Write ONE shared spec.** Self-contained — the agents start cold:
   - the *why* (one paragraph of context),
   - the exact method + tools (concrete commands / tool names),
   - the rules (read-before-quoting; flag-don't-resolve for sensitive or
     judgment-call items; conservative — correct only on a clear source
     mismatch, else FLAG),
   - the front-loaded pattern from the serial probe,
   - the **output format** (a compact structured per-unit report: corrections
     `<ref>: "stale" → "genuine" (verified via X)`, flags, clean items, tally).
   Give each agent the shared spec + its batch slice. Tell them: **edit + report,
   no git/commits** (the presider commits after review).
3. **Stage it — wave 1 to validate, then scale.** Spawn a SMALL first wave
   (~2 agents) on varied batches. Review their work before spawning the rest. If
   the spec produced clean, correct output, spawn the remaining waves; if not,
   fix the spec cheaply (git reverts the small wave). This is the D&C 121
   "reprove, then show increase of trust" applied to your own delegation.
4. **Spawn in parallel.** Multiple `Agent` calls in one message run concurrently
   (or `run_in_background: true`). Use a strong model for careful verification.

## The presiding watch (non-negotiable)

A fan-out is a delegation. Your delegation covenant or standing instructions,
if you keep one, govern it — watch what you order (Abraham 4:18 — watch until it
obeys the INTENT, not until the job returns):

- **Review every agent's report.**
- **Spot-verify the high-stakes catches against the source yourself** — don't
  accept a confabulation-fix or a citation-correction on the agent's word;
  re-grep / re-query it. (In the worked example below, six spot-checks spread
  across all agents confirmed reliability before ~75 edits were accepted.)
- **Check the diff is bounded** (proportionate to the reported corrections; no
  wholesale rewrites).
- **Consolidate**: merge reports into the audit record (e.g. `findings.md`); fix
  any cross-cutting issues the units surfaced (a fan-out can reveal an error that
  reached a *parent* artifact — chase those down).

**Fan-out without the watch is offloading; fan-out with the watch is
multiplication.** The watch is the real bottleneck, which is why the output
format must be reviewable.

## Cost

Spawning is the expensive path — each agent re-derives context cold. Justified
when (parallel speedup + fresh-eyes-per-unit value) > (coordination + review +
cold-start cost). True for independent verification across many units; false for
centralizable single-pattern cleanup.

## Worked example

A 62-file source audit, ~9-18 min in parallel. 6 subagents, staged 2-then-4.
The shared spec front-loaded the serial probe's pattern (a wrong-edition defect
class + "check the citations inside entries"). ~75 corrections; the presider
reviewed all reports, spot-verified 6 high-stakes catches, and checked the diff
before committing. It caught a defect class the serial walk under-checked
(fabricated citations inside quoted entries) and one error that had reached a
*parent* artifact the serial pass marked CLEAN — the strongest evidence for the
higher ceiling.
