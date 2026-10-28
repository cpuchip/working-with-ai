---
name: goldfish-review
description: Blind design review before the build (a zoom-out reader, a paraphrase test, then critics by axis, each in a fresh context that never saw the conversation) and the drift sweep after the build that compares the design docs with the code. Borrowed from Google's Elephant-Goldfish Model with this pack's rails added (floor first, cite the line, economy). Load when a spec is about to be approved for building, or when a shipped project's design docs may no longer match its code.
---

# Goldfish review

Borrowed from Google's Elephant-Goldfish Model
([github.com/google/elephant-goldfish-model](https://github.com/google/elephant-goldfish-model),
Apache-2.0; the ideas come from Dave Rensin's essay "Elephants, Goldfish, and the New Golden Age
of Software Engineering"). Their tagline: "Design with an elephant. Review with a goldfish." The
elephant is the agent with the whole conversation in its head, which drafts the spec. A goldfish
is a reviewer started with no conversation history, which reads only the document and the code it
points at. The rule the whole thing rests on, in their words: "a review in the same context is not
a Goldfish review."

This pack already ran the principle: [gauntlet](../gauntlet/SKILL.md)'s blind critics,
[fan-out](../fan-out/SKILL.md)'s fresh eyes per unit, [foreman](../foreman/SKILL.md)'s blind
verify. What EGM had and the pack did not was the procedure for the design phase: a fixed order,
one axis per reviewer, and a check after the build. This skill is that procedure with the pack's
rails.

## When

- A spec or design document is about to be approved for building.
- Any document another agent will build from without the author in the room.
- After the build: the drift sweep, when a project's design docs may no longer describe its code.

Not for a one-line fix the agent can do in one go. EGM says the same, and the cost is real: one
subagent per reviewer, five or more per full review.

## The stages, in order

Each reviewer is a fresh subagent. Its prompt carries the document path, the files the document
references, and the reviewer's one axis. It carries nothing of the conversation. Reviewers are
read-only.

1. **Zoom out.** One reviewer, one question before any detail: is there a simpler way, and does
   the codebase already do this? EGM's zoom-out goldfish asks "Are we missing existing
   utilities, services, or APIs that already solve this?" and must search the code before
   answering. It also flags speculative features, premature optimization, and a design that has
   dropped into implementation weeds.
2. **Paraphrase test.** One reviewer who does not know this project writes, in its own words,
   what the document proposes and how the existing system works as the document describes it.
   The author compares that with the intent. In EGM's words: "A wrong paraphrase is a finding."
   The same reviewer then lists every project-specific term the document uses without defining.
   General engineering terms are not flagged.
3. **Critics by axis.** Design (does the approach solve the root problem; were alternatives
   weighed), structure (scope and non-goals stated, success criteria observable, phases that
   stand alone), and style. One axis per reviewer, never the author's own axis.
4. **Zoom out again**, on what stages 2 and 3 added. Mitigations are where complexity sneaks
   back in.
5. **Implementation readiness**, on the plan section only: could an agent build this without
   guessing? Are the named files, functions and tables real? This stage reads the code.

Findings come back as Blocker, Major or Nit, each with the section or line it points at. The
author resolves each one as fix or contest, in writing, and the contested ones stay in the
document as accepted trade-offs.

## The rails (what EGM lacks)

- **Floor first.** Nothing a script can check is spent on a reviewer. Links resolve, referenced
  paths exist, the spec's own lint passes, before any goldfish is spawned
  ([oracle-craft](../oracle-craft/SKILL.md), [gauntlet](../gauntlet/SKILL.md) rail 1).
- **Cite the line.** A goldfish is exactly the cold-start reviewer
  [study-it-out](../study-it-out/SKILL.md) warns about. N findings, N references into the
  document or the code. An uncited finding is discarded, not argued with.
- **Economy.** EGM returns many notes by design and leaves the sorting to the human. Here the
  reviewer is told the finding budget and the ranking rule, and a synthesis step merges
  duplicates before anything reaches the human ([three-hazards](../three-hazards/SKILL.md)).
- **Apex discernment stays home.** The goldfish judges the document. Whether the document
  serves the intent is the context-holder's call (study-it-out, point 4).
- **Falsify the reviewer once.** The first time a rubric is used, feed it a document with a
  planted defect and watch it fail. An instrument that has never failed has not been tested.

## Drift sweep (after the build)

EGM's drift report, kept as a procedure. For each design doc in scope: read it, locate the code
it names (explicit paths first, then search for its classes, functions and endpoints), read the
current source rather than memory, and report only divergences, under four heads: logic the doc
describes that the code lacks; models missing fields the design specifies; hardcoded values where
the design called for logic; a different pattern or library than the design chose. Logic no
design covers is also drift. "No drift detected" is a valid row. Output: one dated report, one
heading per document, and a suggested link added to any doc whose code had to be hunted for, so
the next sweep is cheaper. The shape is fan-out (one document per unit): serial probe first,
then scale.

## Relation

- [gauntlet](../gauntlet/SKILL.md) is the same blind-critic move on a build; this is the
  move on the document that precedes the build.
- [study-it-out](../study-it-out/SKILL.md) is the grounding rule every goldfish runs under.
- [fan-out](../fan-out/SKILL.md) for the dispatch shape; [foreman](../foreman/SKILL.md) for who
  commits (the presider, after review).
