---
name: ship-the-working-build
description: The moment something first works, the next move is to put it in front of a real user — not to open the roadmap. Names the unplayed-working-build disease, the git-log tell (a run of commits each adding a system while nothing ships), and why widening beats a roadmap in a fair fight. Use when a project first runs end to end, when "next - a real test with someone" has been sitting unmoved, or when triaging why a promising build went quiet.
---

# Ship the working build

## The autopsy

The tail of a real project's git log — twelve commits in total, read rather than
remembered. These are the last six:

```
day 2   backend and front end working                 ← it WORKED
day 3   documentation for planning and project roadmap
day 4   add the AI section to the docs and roadmaps
day 4   better UI examples
day 4   swap in a 2D physics engine
day 4   added a new mechanic                          ← last commit ever
```

The written plan was twelve epics and seventy-six tasks aimed at "one to two months."
The repository lived three days.

The founding story people tell about a project like this is *it died because the plan
asked for everything at once*. True, and incomplete — because the plan was written on
day three, **after** the thing already ran. Every commit following the working build
either documented a bigger plan or bolted on a new system. **Not one of them finished
what already ran. The project's final act was adding a feature.**

## The disease

Starting too big is the symptom. **The unplayed working build is the disease.**

The moment something works, the instinct is to widen rather than use it. And widening
*feels like progress* — it produces commits, it produces demos, it produces a longer
feature list — which is why it beats a roadmap in a fair fight and why "I'll do the
real test after this next system lands" is such a comfortable sentence. There is
always a next system.

Putting the build in front of a real user is the forcing function that converts a
working build into a shipped thing **before that instinct fires.** After it fires, the
window is usually gone.

## The tells

- **A run of commits that each add a system while nothing ships.** This is the
  strongest signal and it is mechanically detectable — read the log, count the commits
  since the last one that finished something rather than starting something.
- **A roadmap written after the build started working**, rather than before it.
- **"Next: get someone to actually use it" sitting unmoved** on a live project across
  several sessions. Treat that as a real risk signal, not a formality. It is the
  countermeasure being quietly declined, one reasonable postponement at a time.
- **The demo is always given by its author.** If nobody but the person who built it has
  ever driven it to a finish, you do not have evidence that it works — you have
  evidence that its author can work it.

## The move

**When something first works, schedule the session — don't open the roadmap.**

- **Name a date, not an intention.** "We should get someone to try it" is not a
  countermeasure; a date on a calendar is.
- **Ship the smallest thing someone can finish.** Not the most impressive thing; the
  most completable thing. Whatever they can get to the end of is what you will learn
  from.
- **Freeze the feature list until after.** Anything you would have built this week goes
  on the list *the session is going to reorder anyway.* This costs you nothing, because
  the session's findings routinely delete half of it.
- **Write the findings about the surface, never the person** — see the last section of
  [ben-test](../ben-test/SKILL.md). This is what makes the session repeatable, which
  matters more than any single result: a session that leaves the user feeling tested
  is the last one you will get.

## Why an oracle is not enough

A green check tells you the thing works. **Only a real use tells you it is worth
using.** These are different questions and the first one is much easier, which is
exactly why teams substitute it — the build passes, the tests pass, the deploy is
green, and none of that is evidence anyone wants it.

Both matter and neither substitutes:

- [grindability](../grindability/SKILL.md) and
  [oracle-craft](../oracle-craft/SKILL.md) are about the check that says *it works.*
- This skill is about the event that says *it is worth doing.*

The trap is that the oracle is automatable and the session is not, so the oracle gets
built and the session gets postponed. Both are load-bearing; only one of them has a
robot to remind you.

## What this is not

**Not an argument against planning.** It is an argument about *ordering.* A plan
written before anything works is a hypothesis, and cheap. A plan written the day after
something first works is usually an avoidance of the harder next step.

**Not an argument for shipping unfinished work to users at large.** The scope here is
one real user, once, on the thing that already runs — the smallest possible contact
with reality, deliberately scheduled.

## Related

- [ben-test](../ben-test/SKILL.md) — how to write up what you saw so it stays findable,
  and so the user comes back.
- [elicit-taste](../elicit-taste/SKILL.md) — the session is the richest taste-sampling
  instrument you have; capture the reactions verbatim.
- [grindability](../grindability/SKILL.md) — the companion question at green-light time.
- [cut-order](../cut-order/SKILL.md) — decide what gets dropped before the deadline
  makes you decide it.
