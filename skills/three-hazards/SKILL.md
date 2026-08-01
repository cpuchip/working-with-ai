---
name: three-hazards
description: The brake on agent multiplication — cognitive debt, cognitive surrender, and the orchestration tax, borrowed from Addy Osmani. Names what running more agents costs the human, why parallel agents do not create parallel attention, and the operational rule that closes it - explain it or don't ship it. Use before scaling up parallel agents, when review has become a glance, or as the standing counterweight to fan-out and foreman.
---

# Three hazards

Most craft written about working with agents teaches **multiplication** — fan out the
work, run a fleet, delegate the loop, keep marching. It is good advice and it is
one-sided. Multiplication has a bill, the bill is paid in the one resource that does
not scale, and almost nobody writes that part down.

This skill is the brake. It borrows three named hazards from Addy Osmani's talk
*"The engineer of the future is the person who is able to choose what is worth
doing"* ([AI Engineer, 2026](https://www.youtube.com/watch?v=n97BCfyFIvw)), because
the naming is better than ours and a hazard with a name gets noticed.

## 1. Cognitive debt

> "cognitive debt is the erosion of your understanding and memory around how to solve
> problems"

— Addy Osmani ([9:59](https://www.youtube.com/watch?v=n97BCfyFIvw&t=599))

It accumulates by deferring more and more of the solving. For code specifically,
Osmani gives it a measurable form: compare how much code lives in the repository
against how much of it anyone on the team could actually explain. Its close relative
is **delegation debt** — the build is green, the change is yours to merge, and the
team has quietly lost the ability to describe the system it ships
([10:26](https://www.youtube.com/watch?v=n97BCfyFIvw&t=626)).

The reason it accrues invisibly is that every individual deferral is correct. No
single "let the agent handle this one" is a mistake. The debt is the integral, and
nothing in the workflow reports it.

**What it looks like:** you can describe what a subsystem does but not why it is
built that way. You reach for the agent to explain code you merged last week. A
question in review takes a tool call to answer that would once have taken recall.

**The counter-pressure:** pick the parts you intend to keep understanding, and keep
understanding them on purpose. Not everything — that is just refusing leverage. But
the choice should be *made* rather than defaulted, and it should be written down, the
way an owners file records who is on the hook for which directory.

## 2. Cognitive surrender

Delegation says: *do the work, then show me enough evidence that I can judge it* — and
a judgment still happens
([11:17](https://www.youtube.com/watch?v=n97BCfyFIvw&t=677)). Surrender is the
collapse of that step:

> "your answer is now my answer before I have formed any opinions myself"

— Addy Osmani ([11:25](https://www.youtube.com/watch?v=n97BCfyFIvw&t=685))

The failure mode is not using AI. It is **borrowed confidence** — arriving at a
position you did not form, and holding it with the certainty of one you did.

The tell is temporal, and it is the practical thing to watch for: **did you have a
prior?** If you formed no expectation before reading the output, you have nothing to
be surprised by, and surprise is the entire mechanism by which review catches
anything. An agent's answer read without a prior is not reviewed, it is absorbed.

**What it looks like:** you accept a plan you could not have written and could not
now criticize. You defend a decision in a meeting using the agent's reasoning
verbatim. Your confidence goes *up* after reading an output you did not verify — which
is exactly backwards, since an unverified output should widen your error bars.

**The counter-pressure:** form the prior first, even a bad one. Write down what you
expect the answer to be — one line — before you read the output. Cheap, and it
restores the thing that makes review work. And keep the two reflexes symmetric: a
warning invites verification while a reassurance ends it, so an all-clear deserves the
same scrutiny you would give an alarm ([ben-test](../ben-test/SKILL.md),
[oracle-craft](../oracle-craft/SKILL.md)).

## 3. The orchestration tax

> "Your cognitive bandwidth does not parallelize."

— Addy Osmani ([12:14](https://www.youtube.com/watch?v=n97BCfyFIvw&t=734))

Running more agents does not create more of you
([12:09](https://www.youtube.com/watch?v=n97BCfyFIvw&t=729)). Every loop you add
generates more decisions to route, merge, verify, and integrate
([12:18](https://www.youtube.com/watch?v=n97BCfyFIvw&t=738)) — and all of those land
on one person.

This is the direct counterweight to [fan-out](../fan-out/SKILL.md) and
[foreman](../foreman/SKILL.md), and the tension is real rather than rhetorical. Both of
those skills are correct: fresh eyes per unit beat one tiring serial operator, and the
boss who implements stops being able to see. But both multiply the *production* side
of a pipeline whose review side is a single human, and a pipeline that multiplies only
its production side does not get faster — it grows a queue.

Notice also the horizon shift underneath it. A thirty-second run feels like an
interaction. An hour-scale or day-scale task is a **work stream**, and once tasks last
that long — especially several at once — review cannot be a glance at the end. It has
to become a control system
([11:06](https://www.youtube.com/watch?v=n97BCfyFIvw&t=666)).

**Osmani's fix is not fewer agents. It is designing your attention like a system**:
where you enter, what you require, what you reuse
([12:25](https://www.youtube.com/watch?v=n97BCfyFIvw&t=745)). Concretely, that means
deciding these *before* you spawn, not after the reports arrive:

- **Where you enter.** Which checkpoints get your eyes — and, just as important, which
  explicitly do not. An unnamed entry point becomes "all of them," which is how a
  fan-out turns into a reading assignment.
- **What you require.** The report format, fixed in advance and small enough to be
  read. `fan-out` puts this in the shared spec for exactly this reason: the watch is
  the bottleneck, so the output must be reviewable by construction.
- **What you reuse.** What survives the run as a durable artifact — a detector, a
  fixture, a spec — rather than as a report you read once and lose. This is the only
  move that reduces the tax on the *next* run.

**The sizing question, asked before spawning:** *if all N agents return at once, can I
actually review N reports?* If not, the number is wrong regardless of what the work
would support. Capacity to run is not capacity to accept.

## The rule that closes all three

> "Explain it or don't ship it. And it's not because humans have to type every line or
> read every line, but because someone has to understand the work well enough to
> defend it."

— Addy Osmani ([16:17](https://www.youtube.com/watch?v=n97BCfyFIvw&t=977))

This is the load-bearing sentence, and its precision is worth dwelling on: the bar is
not *typed it*, not *read every line*, not even *reviewed it* — it is **someone has to
be able to defend it.** That is a bar you can hold at scale, and it is the only one of
those four that stays meaningful when an agent writes most of the code.

It also gives all three hazards one shared test, which is why it belongs at the end
rather than as a fourth item:

- **Cognitive debt** is the state where nobody can explain it anymore.
- **Cognitive surrender** is explaining it in borrowed words.
- **The orchestration tax** is shipping faster than anyone can explain.

## The check (two minutes, before scaling up)

1. **Name the person who can defend this.** Not the person who ran it — the person who
   could answer a hard question about it next month. If the name is blank, you are
   shipping into debt.
2. **Did you have a prior?** For the last three agent outputs you accepted: did you
   expect something before you read them? Three no's is surrender, not delegation.
3. **Count the queue.** Reports awaiting your review, divided by reports you actually
   read carefully last week. Greater than one means the tax is already unpaid.
4. **Name your entry points before spawning**, and name the artifact the run will leave
   behind besides its reports.

## Related

- [fan-out](../fan-out/SKILL.md) and [foreman](../foreman/SKILL.md) — what this skill
  is a brake on. Read them together; neither is complete alone.
- [human-in-the-loop](../human-in-the-loop/SKILL.md) — where judgment has to stay,
  stated as bins.
- [grindability](../grindability/SKILL.md) — the green-light triage; the orchestration
  tax is a cost that belongs in it.
- [resting-metabolism](../resting-metabolism/SKILL.md) — the machine-side version of
  the same law: attention and appetite are both budgets, and both get audited.
- [ben-test](../ben-test/SKILL.md) — whether you practice this or merely shipped a
  skill file about it.
