---
name: debugging
description: Agans' 9 rules as the debugging reflex — load the moment something breaks, errors, contradicts a source, or "used to work," BEFORE the second attempt. Retrying without a diagnosis is the anti-pattern this exists to stop. For long diagnoses, escalate to the `debug` agent.
---

# Debugging — the 9 rules as reflex

**Trigger discipline: this loads at the FIRST failure, not the fourth.** The tell
that you needed it three attempts ago: you are about to re-run the same command,
re-prompt the same agent, or "try one more thing" without being able to say what
new information the attempt will produce.

**The core principle: reality over narrative.** Every debugging failure is the
same failure — a story about what's happening substituted for looking at what's
happening. Moroni 10:4 is the epistemology: ask if it is **not** true — you
prove a diagnosis by trying to kill it and failing.

## Triage first — which layer?

| Layer | Smell | Start with |
|---|---|---|
| **Data** | wrong/missing input | Rule 7 — Check the Plug |
| **Logic** | right input, wrong processing | Rule 4 — Divide and Conquer |
| **Integration** | parts fine, joins broken | Rule 1 — Understand the System |
| **Output** | right result, wrong delivery | Rule 3 — Quit Thinking and Look |

(Intellectual work maps the same: Source / Inference / Framework / Presentation.)

Establish which layer is actually empty before ruling in the layer you can
change — and when the failure sits between two people's spheres, see
[own-the-seam](../own-the-seam/SKILL.md).

## The 9, compact

1. **Understand the System** — read the source/spec/error *fully* before
   theorizing. You can't fix what you don't understand.
2. **Make It Fail** — reproduce on demand or you don't understand the
   conditions. Stimulate the failure; never simulate it.
3. **Quit Thinking and Look** — read the ACTUAL output/log/file, not your
   memory of it. Instrument if you can't see.
4. **Divide and Conquer** — binary-search the pipeline: where does good data
   become bad?
5. **Change One Thing at a Time** — and **back out a failed fix immediately**.
   Never leave a dead fix in place while trying the next.
6. **Keep an Audit Trail** — write attempts + results to a scratch file
   (`scratch/debug-<issue>.md`, wherever your project keeps working notes).
   "It's broken" is not an entry.
7. **Check the Plug** — is the server running, the path right, the binary the
   one you built, the build current? Staleness is Rule 7 territory in all its
   forms: a ghost binary, a pinned worktree, a cached page, a restarted server
   that isn't the one being called. Build markers — a `/healthz` route, a
   version string, a build stamp — exist to answer this in one request.
8. **Get a Fresh View** — explain it to another agent or person; a differently-
   biased reader catches what fluency hides. "You cannot inspect your own
   proposal for the failure mode you're most fluent in."
9. **If You Didn't Fix It, It Ain't Fixed** — reproduce the original failure,
   apply the fix, watch it pass, REMOVE the fix, watch it fail again, restore.
   "Build passed" is not verification.

## House riders (paid for the hard way)

- **Distrust a negative from an instrument you just wrote** — probe the probe
  before trusting its "no." A count of zero is conspicuous; a low count lies.
  ([oracle-craft](../oracle-craft/SKILL.md) is the design-side companion.)
- **A truncated read is a status line wearing an artifact's clothes** — read the
  whole error, the whole comment, the whole function.
- **Source is intent; the wire is behavior** — you cannot get from a source line
  to runtime truth by reading; only by pressing/running.
- **Timestamp your artifacts** — an artifact without a timestamp is an opinion,
  and a measurement has a shelf life even when every input is current.
- **Ask what your instrument is structurally incapable of seeing** before you
  ask what it saw.
- **"My instrument cannot do it" is not "it cannot be done"** — before shelving
  a check you can't run, spend thirty seconds searching the repo for the
  capability. ([verification-chain](../verification-chain/SKILL.md).)

## When the diagnosis lands

A bug you just understood is a class, not an incident. Sweep **backward** over
what you already shipped with the same shape — catching the class in new work
does not audit the claims you already published
([oracle-craft](../oracle-craft/SKILL.md) §3c).

## Escalation

Circling for more than ~20 minutes, or the diagnosis spans several
files/systems → hand to the **`debug` agent** (the full phased workflow:
characterize → reproduce → isolate → fix → verify → close). Systemic root
cause → write it up as a proposal for whatever planning workflow you use.
Either way: the scratch file rides along — it is the handoff.

*The 9 rules are David J. Agans', from* Debugging: The 9 Indispensable Rules
for Finding Even the Most Elusive Software and Hardware Problems *(2002). Each
chapter carries war stories that make an abstract rule concrete; the book is
worth reading in full, not just the list.*
