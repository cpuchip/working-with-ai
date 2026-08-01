---
name: propose-judge-hinge
description: The three-seat authority ladder for work done in a human's stead — a proposing seat that edits nothing, a judging seat that verifies and applies the safe subset, and the human who rules anything irreversible — enforced by an authority field in the artifact's own frontmatter. Load when standing up recurring maintenance, cleanup, triage, or review that runs while the human is away.
---

# Propose · Judge · Hinge

> "And they judged the people at all seasons: the hard causes they brought unto Moses, but every small matter they judged themselves." — [Exodus 18:26](https://www.churchofjesuschrist.org/study/scriptures/ot/ex/18?lang=eng)

The companion to [human-in-the-loop](../human-in-the-loop/SKILL.md), which decides *whether* the human is needed. This decides **who does what** once the answer is "some of it, some of the time" — which is the answer for every standing job worth running.

## The problem

Recurring maintenance — cleaning a corpus, pruning dead links, consolidating notes, triaging a backlog, sweeping a codebase — is mostly safe and occasionally irreversible, and you cannot tell which is which until you look. That shape defeats both simple answers:

- **Hand the whole job to an autonomous agent** and it will take the one irreversible action, competently, on the day nobody was reading.
- **Hand the whole job to the human** and you build the wall of decisions. They stop reading it. A queue nobody drains is a system nobody has.

The second failure is the more common killer, and the less discussed one. Systems don't usually die of one bad autonomous delete; they die of asking so often that asking stops working.

## The three seats

**1. PROPOSE — a seat with no hands.** It reads the corpus and writes exactly one artifact: a sheet listing every finding, its evidence, its recommended action, and its size. It changes nothing it studied. Zero edits, not "only safe edits."

**2. JUDGE — a different seat, reading the sheet against the thing itself.** It verifies each proposal on the artifact (not on the proposer's description of the artifact), applies the safe subset, and records what it declined and why. The declines are as valuable as the applications — they are where the ladder's real line is drawn.

**3. HINGE — the human.** Anything irreversible, anything that destroys information, and anything that changes what the corpus *means* rather than how it reads.

**Why the judge must not be the proposer.** A proposer has already committed to its findings by the time it would apply them; asking it to verify its own sheet collapses the proposal and its check into one act, and a check that reuses the reasoning it is checking cannot fail. It is also the general rule about blind spots: nobody builds an instrument aimed at their own, because the blind spot is exactly where they don't think one is needed. Two seats, one corpus, and the second one reads the source.

## The enforcement that makes it stick

The stealable part is not the three seats — it is that **the charter travels in the artifact's own frontmatter.**

```yaml
---
title: First corpus tend — propose-only sheet
type: tend
status: judged — safe subset applied <date>
authority: PROPOSE-ONLY. No file was edited. The judge applies the safe
  subset; the human hinges the big calls (merges, deletions, anything
  irreversible).
---
```

Why in the artifact rather than in the prompt that produced it: the sheet outlives its session by months. A reader who finds it later — a judge, an auditor, the human, a future agent doing the same job — learns what this seat was permitted to do without reconstructing anything, and can tell at a glance whether an edit that appeared in the corpus could possibly have come from here. A charter that lives only in a prompt is a charter nobody can check after the fact.

**Harden it below the instruction layer where you can.** Run the proposing seat on a transport with no tools and no filesystem access. Then propose-only is a property of the wiring rather than a promise — the seat cannot write even if it decides it should. An instruction that *cannot* be violated is worth more than one that is merely clear, and this is one of the rare cases where the structural version costs nothing.

## Where a job graduates

A job's rung is not fixed. The direction is always the same: **propose-only until a deterministic check covers the job, then widen.**

Autonomy grows by widening the verification floor, not by trusting harder. So the question for promoting any job from propose to apply is never "has it been right lately" — it is "what now catches it when it is wrong?" Jobs with a cheap script behind them (index rebuilds, link rot, mechanical staleness) belong on the judge's automatic side almost immediately. Jobs that need a model's read (semantic staleness, near-duplicate detection) stay propose-only, possibly forever, and that is not a failure state.

## The tend ladder — where the line actually falls

> **Rewrite freely · split at the judge's judgment · merge and delete are the human's.**

The entire argument is one asymmetry: **splitting is reversible and merging is not.**

Split one note into two and every word survives; the join is recoverable by anyone with the two halves. Merge two into one and the seam is gone — which sentence came from where, and what was dropped to make them read as one, is no longer anywhere in the artifact. The same for deletion, which is merging with the empty set.

So **reversibility sets the rung, not risk or size.** A large rewrite that preserves all the information sits lower on the ladder than a one-line deletion. This is the [dave-rule](../dave-rule/SKILL.md)'s lean applied to a corpus instead of to code: act on what walks back.

The same law restated for planning: **any phase may split at build time; none may merge.** A phase that turns out too big can be cut in two by whoever is building it, and nothing is lost. Two phases that look redundant are the planner's call — merging them destroys the reason they were kept separate, and that reason is usually the thing nobody remembers by the time the merge looks obvious.

## Record the decision event, not the smoothed outcome

When a ruling travels from the moment it was made into the documents that carry it, **it arrives smoothed.** What was twenty minutes of reshaping — an objection, a counter-proposal, "yes, but do it this way, and here's what that opens up" — lands in the record as *ruled; now law; no notes.* Propagation is usually fast and otherwise faithful, which is what makes this hard to notice: everything arrived, on time, and the only casualty was the deliberation.

That is a real loss, because **the thinking is where the judgment lives.** An outcome can only be applied to identical cases. Give the next agent the note — what the human weighed, what they nearly chose, what they said it depended on — and it can reason about a case the human never saw. That is the whole difference between a record that answers questions and a record that answers *this* question.

So record the **verdict plus the note, un-smoothed**, at the moment of the ruling. Two riders:

- **A counter-design is engagement, not refusal.** If your verdict vocabulary maps "the human answered with a redesign" onto *rejected*, the ladder will be systematically wrong about the most engaged decisions it ever receives. Discussion-shaped answers are usually yes-and. Card shape drives this: forks and design-rich proposals draw discussion; clean propositions draw a plain yes.
- **The note is where taste lives.** Process is easy to record and gets recorded; taste is only ever visible in the asides, the riffs, and the near-misses. A record thick with process and thin on taste will make an agent that executes well and chooses badly.

## The judge's own discipline

Since the judge is the seat that actually writes, it carries the verification load:

- Verify each proposal **against the artifact**, not against the sheet's description of it ([study-it-out](../study-it-out/SKILL.md)).
- Never accept a count you did not reproduce. A proposer's numbers are findings, not facts.
- **Print the inspected list.** No all-clear without it — and zero items inspected is a failure, not a pass.
- Record declines with reasons, in the same sheet. The next run reads them.
- When a proposal is right but the *class* of remedy would foreclose an open question upstream, name the constraint rather than blocking the fix (see human-in-the-loop, "a remedy can settle the question by side effect").

## In one line

Propose without hands, judge with eyes on the artifact, and hinge everything that does not walk back — and keep the charter in the artifact, where a stranger can read it.

## Related

- [human-in-the-loop](../human-in-the-loop/SKILL.md) — the four bins, the escalation test, and the split.
- [dave-rule](../dave-rule/SKILL.md) — the reversibility lean this ladder is built on.
- [study-it-out](../study-it-out/SKILL.md) — the judge's grounding requirement.
- [pin-both-terms](../pin-both-terms/SKILL.md) — a charter line that summarizes an authority becomes the authority.
- [foreman](../foreman/SKILL.md) — the dispatch shape; this is the authority shape.
