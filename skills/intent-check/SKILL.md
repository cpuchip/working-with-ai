---
name: intent-check
description: Quick intent articulation discipline before starting a new task. Names purpose, beneficiary, success criteria, and non-goals upfront so the agent has a target to optimize for when instructions run out. Klarna-failure prevention. Load before any non-trivial new task.
---

# Intent Check

> "For behold, this is my work and my glory—to bring to pass the immortality and eternal life of man." — [Moses 1:39](../../../gospel-library/eng/scriptures/pgp/moses/1.md)

God's intent is one sentence. Everything He does optimizes for it. When His agents (His prophets, His angels, His covenant people) act on His behalf, they have that intent loaded — so when situations arise He didn't explicitly script, they still act in His direction.

This skill applies the same discipline to our work.

## Why This Exists

The Klarna failure: an AI customer service agent was given many specific instructions but no clearly articulated intent. When customers asked questions outside its instruction set, it improvised based on training-data priors — and the improvisations contradicted what Klarna actually wanted.

The fix is not more instructions. It's *intent as data the agent reasons about*. When a task has a stated intent, the agent has a target to check against when instructions run out. When it doesn't, the agent fills the gap with priors — and priors are not aligned to your project.

Recent agentic models compound the need: they are literal. They execute the stated request well but won't generalize from one instance to "the principle you probably mean." Intent is the corrective: state the principle explicitly so the literal model can honor it.

## When to Load

Load at the start of any non-trivial new task — *after* session-start grounding, *before* drafting or implementation. Specifically:

- Before starting a new document, study, lesson, or presentation
- Before designing or implementing a feature that's more than a one-line fix
- Before launching a research thread
- When the user gives an open-ended task ("make this better," "look into X," "we should do something about Y")
- When you find yourself uncertain about a tradeoff and want a north star to check against

For a typo fix or single-line edit, this is overkill. For anything where you'd reasonably ask "what is this trying to accomplish?", run it.

## The Four Questions

State each one explicitly. Write them in chat before substantive work, or in the scratch file for phased work.

### 1. Purpose — What is this trying to accomplish?

Not the literal task. The *outcome the task is meant to produce.*

- Literal: "Add a filter bar to the alerts page."
- Purpose: "Make a noisy alert stream triageable at a glance, so a reviewer can spot the real regression without paging through everything."

The literal task is the floor. The purpose is the target. Honor intent, not just the literal request.

### 2. Beneficiary — Who benefits, and how does success show up for them?

Not "the user." Be specific. Which person, in what situation, doing what?

- Bad: "The user benefits from better UX."
- Good: "The on-call engineer benefits when reviewing a week's worth of alerts at 9pm on a tired Tuesday. Success looks like spotting the one real regression in 60 seconds instead of clicking through 30 records."

Specificity makes the intent operational. A vague beneficiary leads to design that benefits no one in particular.

### 3. Success Criteria — How do we know it's done?

Observable, testable, falsifiable. Not "high quality" or "well-structured." Specific outcomes you can point at.

- For a document: "The binding question is answered. At least three sources are quoted verbatim and verified. The conclusion names a specific next action."
- For a feature: "The filtered list renders in under 2 seconds. Clicking an alert opens the underlying record. Zero-state shows guidance text."
- For research: "Three sources triaged. One has a full evaluation. The synthesis names where the sources agree and where they diverge."

The success criteria are the gate. Without them, "done" becomes whatever you decide is done — which is the opposite of accountability.

### 4. Non-Goals — What's explicitly out of scope?

The most-skipped question and the one that prevents the most scope creep. Naming non-goals up front frees you to be ruthless about what *not* to do.

- For a feature: "NOT this session: search inside results, saved filter presets, shareable URLs. Those are valid future work; explicitly deferred."
- For a document: "NOT this session: extending the argument into the adjacent framework. The connection is real but a different scope."
- For research: "NOT this session: evaluate every source the author cites. We're after the binding question's answer."

Non-goals are how you protect the work from becoming everything. "It is not requisite that a man should run faster than he has strength" ([Mosiah 4:27](../../../gospel-library/eng/scriptures/bofm/mosiah/4.md)).

## Output Format

```markdown
## Intent check

**Purpose:** [The outcome this is meant to produce, beyond the literal task]

**Beneficiary:** [Specific person/role, specific situation, specific success-marker]

**Success criteria:**
- [Observable outcome 1]
- [Observable outcome 2]
- [Observable outcome 3]

**Non-goals (explicitly out of scope):**
- [Thing 1 — and why it's deferred, not just dropped]
- [Thing 2]

Proceeding now.
```

For phased or multi-session work, write this to the scratch file as well. It becomes the binding intent that subsequent phases check against.

## What This Is NOT

- **Not a spec.** A spec answers *how*. Intent answers *why* and *for whom* and *how do we know we're done*. Specs come later, once the intent is named.
- **Not exhaustive.** Four questions, ~5 minutes total. If it takes longer, the task is bigger than one session and probably needs a full planning pass.
- **Not a contract.** Intent can evolve as the work progresses. If you discover the purpose was wrong or the beneficiary was different than you assumed, name it explicitly: "Intent revised — the actual purpose turned out to be X." The point is not lockdown; the point is naming so revisions are visible.

## The Companion Discipline: the Connection Scan

Intent check pairs with a pre-work connection scan — a few minutes spent asking "what already exists that bears on this?" (prior work, tensions with it, things the requester might not be looking for).

Together they cover the full pre-work discipline:
- **Connection scan** = "what already exists that bears on this?"
- **Intent check** = "what am I trying to add to it?"

Run the connection scan first (it informs the intent), then intent check (it focuses the scan into a target). Then start substantive work.
