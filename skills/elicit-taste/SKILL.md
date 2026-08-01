---
name: elicit-taste
description: Taste is sampled, never introspected — how to capture a person's qualitative judgment as usable data instead of asking them to describe it. Forced-choice decks, concrete-artifact reactions, and verbatim capture of the riffs. Use when an agent must decide in someone's stead on anything where no metric exists, when a record is thick on process and thin on preference, or when you catch yourself about to ask "so what's your taste?"
---

# Eliciting taste

## The definition worth borrowing

Addy Osmani, in *"The engineer of the future is the person who is able to choose what
is worth doing"*, credits Mitchell Hashimoto with the most useful working definition
of the word:

> "Taste is the ability to make high-quality qualitative judgments where no objective
> metric exists yet."

— Mitchell Hashimoto, quoted by Addy Osmani
([7:11](https://www.youtube.com/watch?v=n97BCfyFIvw&t=431))

What makes it useful is *where no objective metric exists yet*. Taste is not a
mystical substitute for measurement; it is what you use **before** the benchmark
exists and before the market has voted. That places it precisely: it is the judgment
that survives after every check you could automate has already run green.

And it comes with a guard, from the same talk, in the breath just before:

> "taste can become a magic word for whatever part of the work we don't want to
> explain just yet."

— Addy Osmani ([6:55](https://www.youtube.com/watch?v=n97BCfyFIvw&t=415))

Hold both. The definition makes taste a real thing worth capturing. The guard keeps
"that's a taste call" from becoming the phrase you reach for when you would rather not
say why. Osmani's own resolution is the standard to hold yourself to: taste only pays
off if it converts into critique, examples, and better judgment over time
([7:34](https://www.youtube.com/watch?v=n97BCfyFIvw&t=454)) — which is exactly what
this skill is for.

## The core claim

**Taste is elicited, never introspected. You don't point at it — you sample it.**

Ask someone to describe their own taste and you will get a metaphor. Ours, asked
directly, reached for something about taste being an extra dimension you cannot point
at — which is an *honest* answer, and useless as data. This is not a failure of
articulacy. Preference is stored as a very large set of situated judgments, and the
compression to a sentence throws away everything an agent would need to reproduce one.

So stop asking. **Put artifacts in front of them and record what happens.**

The evidence is blunt: the single richest taste record on one project came from
measured A/B listening across dozens of candidates on a music build — picks and the
throwaway reasons beside them. The questionnaire version of that same knowledge did
not exist and would have been worthless if it had. Meanwhile a
[war-game](../war-game/SKILL.md) run against the whole written record found its one
substantive miss on exactly the card that turned on taste: the corpus documented
*process* thoroughly and *preference* barely at all, so the judge produced the answer a
disciplined steward would give rather than the answer that particular human would give.

## The three instruments

### 1. Forced-choice decks

A card is two concrete options and one question: **A or B, and why?** Not a rating,
not a ranking of abstractions, not "how do you feel about X." The forced choice is what
makes it data — a preference expressed under constraint is falsifiable; a preference
expressed in the abstract is a mood.

- Keep both options genuinely shippable. A deck where one option is obviously bad
  measures nothing.
- **Capture the "why" verbatim.** The pick is the label; the reason is the feature.
- Batch them. Ten cards in one sitting produce a comparable set; one card a week
  produces ten unrelated moods.
- Record the near-misses. "B, but if it were slightly slower I'd say A" is worth more
  than either pick alone.

### 2. Concrete-artifact reactions

Show the thing. A build, a page, a track, a draft, a screenshot. React first, explain
after. The order matters — a person asked to explain first will construct a rationale
and then defend it, and you will have captured the rationale instead of the taste.

The corollary is a scheduling instruction, not a note-taking one: **you cannot elicit
taste about an artifact that does not exist yet.** This is one more reason the working
build gets put in front of someone rather than widened — see
[ship-the-working-build](../ship-the-working-build/SKILL.md).

### 3. Verbatim capture of the riffs

The highest-density taste data is almost never produced on request. It is the aside in
a review, the two sentences of elaboration attached to an approval, the thing they got
excited about that nobody asked about. **Capture it verbatim and file it as taste**,
not as chatter.

This is mostly a *plumbing* problem rather than a discovery problem. The riffs are
usually already being written down somewhere — in approvals, in review threads, in
chat — and then thrown away by whatever summarizes them.

## The finding that guards all three: record the event, not the outcome

**Propagation smooths deliberation into outcome, and the thinking is where the taste
lives.**

Watch how a decision travels. Someone says *"yes, mainly as an option — some people
will find it cheesy"* and three days later the design doc says **RULED — now law**. The
verdict survived. The taste died in transit, and it was the only part that was hard to
get.

So: **the ruling event is the record.** Store the verdict *and* the note, un-smoothed,
in the same artifact. A summary line may compress a topic; it must never restate the
judgment smaller than it was made. (The authority-side version of this rule — an index
line that paraphrases a grant becomes the grant — lives in
[pin-both-terms](../pin-both-terms/SKILL.md).)

Two practical consequences:

- **A response that reshapes a proposal is a yes-and, not a no.** If your capture
  vocabulary only has *approved* and *rejected*, every rich response gets filed as the
  wrong one, and the file where taste is thickest is the file you have systematically
  emptied.
- **Card shape drives the response you get.** Clean propositions draw clean yeses and
  teach you nothing. Forks and design-rich cards draw deliberation. If you want taste,
  write cards that invite a riff.

## Anti-patterns

| Don't | Do |
|---|---|
| "Describe your taste in X." | Two options, pick one, why? |
| Rate these nine attributes 1–5. | React to this build. |
| Summarize the approval. | Store the approval **and** the note, verbatim. |
| Ask once, in an interview. | Sample continuously, from work already happening. |
| File the excited tangent as chatter. | File it as taste, with the words intact. |
| Infer preference from a decision's outcome. | Read the note the decision came with. |

## The decay caveat

Taste is not a permanent moat, and it is worth being honest about that while building
a system to capture it. Osmani's framing: an edge is *alpha*, and *decay* is the clock
on it — speed decayed, recall decayed, verification is moving into harnesses, and taste
decays more slowly but still resets as models learn from examples and preferences
([8:31](https://www.youtube.com/watch?v=n97BCfyFIvw&t=511)).

That is an argument for capturing taste *sooner*, not for treating it as sacred. The
captured examples are what make the judgment reproducible — by a teammate, by an agent,
by you in six months when you have forgotten why you picked B.

## Related

- [war-game](../war-game/SKILL.md) — measures whether the record carries enough of a
  person to decide in their stead; taste is where it will fail first.
- [vision-interview](../vision-interview/SKILL.md) — the conversational sibling: draw
  the vision out, never supply it.
- [human-in-the-loop](../human-in-the-loop/SKILL.md) — taste calls are bin 3 and 4 by
  construction; eliciting taste is how you narrow what has to be asked.
- [ui-review](../ui-review/SKILL.md) — the concrete-artifact instrument, applied to a
  surface.
