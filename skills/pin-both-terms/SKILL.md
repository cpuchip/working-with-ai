---
name: pin-both-terms
description: A word doing unpinned work in prose will be pinned by whoever implements it — and the pin becomes canon silently, because a predicate looks decided in a way prose doesn't. Load when writing anything someone else will turn into a check (specs, acceptance criteria, done-when conditions, rules, prompts), when implementing someone else's prose, and when writing an index or hook line that points at an authority.
---

# Pin Both Terms

## The law

A word doing unpinned work in prose **will** be pinned by whoever implements it — and the pin becomes canon silently, **because a predicate looks decided in a way prose doesn't.** Nobody re-reads a table cell for ambiguity; that is what the table was for.

Prose advertises its own softness. A sentence can be read twice and argued with. The moment it becomes `speed < 5.0`, the softness is gone from the artifact but not from the decision — and every reader downstream inherits a ruling nobody made.

## The three-layer ladder

The failure has three floors, and each one looks like progress:

1. **Prose leaves a word loose.** The author knows what they meant and supplies one clarifying term, usually the one easiest to write down.
2. **The predicate pins one term.** The implementer needs something measurable. They pin what the sentence gave them and infer the rest — reasonably, in good faith, and invisibly.
3. **The documentation of the pin certifies a seam that was never shared.** The note recording the implementation says *threshold 5.0 exactly — matches the rule's seam.* True of the number, false of the seam. That is a claim wearing verification's clothes: **checking that a document says the seam is shared is not checking the seam.**

Floor 3 is the one that ends the checking, because it reads as the confirmation everyone was waiting for.

## The worked case

A completion rule said a run counted as finished when one vehicle "parks beside" another, with a parenthetical pinning it: *relative velocity ≲ 5 m/s.*

"Beside" carries two terms — a **speed** and a **distance**. The parenthesis pinned one.

What followed was faithful all the way down. The spec's own summary table carried the pinned term. The implementation matched the table. Two test setups matched the implementation. A live human run passed. The author's own review passed. **Five surfaces, none careless** — and all five blessed runs that sat at zero relative speed while the two vehicles were tens of kilometres apart, under a rule whose own prose described handing something from one to the other.

The missing sentence was always one question away: *you cannot hand a thing across thirty kilometres.* The implementer inferred instead of asking; the author supplied a parenthesis instead of both terms.

## Why five correct surfaces still got it wrong

Each surface verified against the one immediately upstream of it, and each was right to. Nothing in the chain re-touches the original prose — by the second floor the prose has been superseded by something sharper, and sharper reads as more authoritative. So the ambiguity is not caught later; it is *sealed* later. Every additional green surface makes it less likely anyone reopens the sentence.

This is the seam problem in miniature: the join between the sentence and the predicate belongs to nobody. See [own-the-seam](../own-the-seam/SKILL.md) and [verification-chain](../verification-chain/SKILL.md).

## A hook may summarize a topic, never restate an authority

The same law, applied to indexes: **an index line that paraphrases a grant becomes the grant.**

The evidence: a one-line index entry summarizing a standing permission dropped a qualifier and rendered it narrower than the ruling it pointed at. Nobody edited the ruling; the ruling was still on disk, intact. But an agent later decided a live case from the narrowed copy, having never opened the body — because the index is what gets read, which is the entire reason indexes exist.

The rule:

> **Summaries may compress a topic. An authority line must point at the body that holds the ruling verbatim, or render it verbatim — never re-say it smaller.**

This binds harder every year, because indexes are increasingly generated rather than written: **a projector that paraphrases authority mints canon nobody ruled.** The paraphrase carries the tone of the original and the scope of whatever the summarizer had room for.

**The test:** could a reader act on this line without opening the body? If yes, and the line is a summary, you have minted authority. Fix it by pointing, quoting, or widening the line until acting on it is obviously premature.

## How to apply

**When you write prose someone will implement** — rules, specs, earning conditions, acceptance criteria, prompts — every load-bearing word either:

- gets **all** of its terms pinned (numbers, units, edges), or
- carries an **explicit flag** that it is unpinned and the implementer must ask.

Prefer **borrowed edges over coined ones**: a threshold that already exists somewhere in the system has a reason behind it that survives being copied. A number invented mid-sentence has none, and it will be treated as though it does.

**When you implement someone else's prose:** a word your predicate does not capture is a **question, not an inference.** The asymmetry is brutal — asking costs one message, and inferring costs everything downstream, silently, with every gate green.

**When you review a pin:** check the seam, not the document's claim about the seam. Read the original sentence and the predicate side by side, and name every term the sentence carries that the predicate does not.

## The tell

The predicate is narrower than the sentence, and nobody noticed — because the predicate is the only artifact that runs.

## Related

- [own-the-seam](../own-the-seam/SKILL.md) — the join between two correct halves belongs to nobody by construction.
- [verification-chain](../verification-chain/SKILL.md) — a certification is not a check.
- [propose-judge-hinge](../propose-judge-hinge/SKILL.md) — where a pin is a proposal and where it is a ruling.
- [human-in-the-loop](../human-in-the-loop/SKILL.md) — an unpinned load-bearing word is often a bin-3 fork wearing implementation clothes.
