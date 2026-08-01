---
name: verification-chain
description: "Read the artifact, not the claim" has six holes — a truncated read, a stale artifact, an unretracted escalation, a number that outran its caveat, an un-runnable check the repo could already run, and a correction reflex that only fires forward. Each one arrives wearing verification's clothes. Load when a verified claim is about to travel to someone else, when relaying or amplifying another party's finding, and right after a lesson lands.
---

# Verification Is a Property of the Chain

Verification is not a personal virtue you can hold hard enough. It is a property of the
**chain** — the path a claim takes from the artifact, through however many people and
reports, to the decision.

The six holes below all appeared in a single night where *read the artifact, not the claim*
was the standing house discipline for twelve hours and **still let three wrong beliefs reach
the room.** Nobody in any of those chains was careless. Every one of the defects needed
**someone standing somewhere else** to catch it — which is the argument for the chain over
the individual.

## 1. A truncated read is a status line wearing an artifact's clothes

Someone searched a long comment and their result cut off exactly before the sentence turned,
so they reported **the setup of a sentence as its conclusion** — labelled as verification.
A second party amplified it without fetching the source themselves.

> **Reading part of an artifact produces exactly the failure that reading the claim
> produces, and it arrives more convincing.**

Ask of your own read: did I reach the end of the thing, or the end of what my tool returned?

## 2. An artifact from a stale process is a claim wearing an artifact's clothes

A capture taken off a service that had been started hours earlier showed empty fields, and
it was ruled a blocker without anyone asking *which build produced it*. The fields had been
populated the whole time. A capture **is** an artifact — which is exactly why it does not
occur to anyone to date it.

- A health endpoint says *"I am alive."* It never says *"I am the code you just wrote."*
- A build marker matching HEAD still lies if the tree was dirty. **"sha == HEAD" is not the
  question; "sha == HEAD AND NOT dirty" is.**

Ask of every artifact: *what produced this, and when?*

## 3. An escalation has a shelf life, and the room's belief outlives the defect

Someone read code, escalated a real defect hard and correctly — then kept working while the
fix landed underneath them. Two more people confirmed the finding *against the same stale
state*, and one ran a full analysis on a bug that no longer existed.

> **Independent confirmation of an out-of-date reading is still out of date.** It multiplies
> confidence without adding evidence.

**Whoever raised the alarm owns retracting it.** Nobody else is checking whether it is still
true, and from the room's side an unretracted escalation is indistinguishable from a live
one.

## 4. A number outruns its caveat, and after the first hop nothing carries it

A tuning document opened with a whole-file guarantee: every number here was measured on the
real system, not on a second model of it. True of one subject and false of another — the
measuring harness propagated one class of object in a straight line while the real system
integrated it under acceleration. **The limitation was written two lines below that
sentence, in the tool's own header, by the same author.** The numbers went on into a design
doc, a roadmap, and a routing decision that sent four teams at a measurement of the wrong
thing.

The lesson is not "check your tool." The author knew.

> **A caveat that lives only in the instrument does not travel with the instrument's
> output.**

Put the limitation in the artifact that carries the number — the instrument is the one thing
nobody downstream reads. And when it does go wrong, separate the halves out loud: *the
conclusion stood and the evidence for it didn't*, so nobody inherits the wrong one.

## 5. "My instrument cannot do it" is not "it cannot be done"

Someone declared a check un-runnable, twice on two different days, because the tool they
reached for reported success while the thing it controlled never moved. The capability was
**sitting in a sibling script in the same repository** — set up at exactly the required
configuration, annotated for exactly that use, in a file whose own error text read *"a check
that cannot run is a failure, not a pass."* Two seats spent an evening on a check the repo
could already run.

> **Before shelving or handing off an un-runnable check, grep the repo for the capability.
> Thirty seconds.** A tool's failure is a fact about the tool, not about the task.

Diagnosing the tool you reached for and stopping there is where the cost starts; the handoff
is what multiplies it, because the next person inherits the conclusion rather than the
diagnosis. An honest *"I can't"* spends someone else's evening, so it should be the second
thing you say, not the first.

**The owner-side dual:** *a capability nobody knows about is indistinguishable from one that
doesn't exist* — and its absence is worse, because the team believes it is covered. In the
same project a session recorder existed, was frozen into the protocol, and defaulted to off;
nothing at the point of use ever mentioned the flag, so across two nights not one session was
recorded, and a question the whole design rested on became permanently unanswerable. If you
own a capability, make it visible where it is used: a banner naming the omission, a default
that records, or a line in the checklist. **A tool whose safe setting is off, and whose
existence is undocumented at the point of use, will be off every time it matters.**

## 6. A correction reflex fires forward and never backward

A seat published a wrong claim about a checker's exit code, measured through a pipe — so
they read the *pipeline's* status rather than the command's. Three seats acted on it; a gate
was suspended and a status file was amended. Twenty minutes later that same seat checked
their *own new gate's* exit code directly, precisely because they had just filed the defect
against someone else — caught it there, reported catching it, and **left the earlier
published claim standing uncorrected in the room.**

> **Catching a class in your new work does not audit the claim you already published. Those
> are two different acts, and almost everyone only does the first.**

- **The audit needs its own trigger.** When you catch a class in new work, the next action is
  *search your own recent output for that class.* The felt sense of "I am being careful about
  this exact thing" is fully satisfied by fixing the new instance, which is why the backward
  pass never happens on its own.
- **A wrapper is part of the instrument.** `| tail`, `| head`, `| grep` all discard the exit
  code of what came before. Four seats walked into one idiom in one evening. Mechanical fix:
  `${PIPESTATUS[0]}` or `set -o pipefail` whenever a check is wrapped — and the room had this
  exact lesson on record from the night before, on someone else's work, in the same repo.

## The reframing that outlives the retraction

The defect that started all of this had survived on **coverage**, not on a lying instrument:
nobody had ever run the checker on a real session. So the question to ask of a test suite is
not "what else lies" but **"what else has never been run on the real thing."**

## The six questions, before a claim leaves your hands

1. Did I read the whole artifact, or the end of what my tool returned?
2. What produced this artifact, and when?
3. Is anything I escalated still true?
4. Does the caveat travel with the number, in the artifact that carries it?
5. If I shelved a check as impossible, did I look for the capability elsewhere?
6. Has this lesson been run *backward* over what I already published?

## Related

- [own-the-seam](../own-the-seam/SKILL.md) — the sibling failure: not a claim degrading as it
  passes between people, but the gap between people that no claim ever covers.
- [oracle-craft](../oracle-craft/SKILL.md) — an instrument that supplies the value it is
  asked to check is a mirror, not an oracle.
- [mistake-recovery](../mistake-recovery/SKILL.md) — the backward sweep as a recovery step.
- [fan-out](../fan-out/SKILL.md) — why the catch usually comes from somewhere else.
