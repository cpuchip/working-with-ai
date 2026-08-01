---
name: study-it-out
description: Ground analytical judgment in the actual artifact before rendering it. Load before producing OR dispatching a review, critique, evaluation, assessment, or "is this right / this is the bug" verdict — anywhere a conclusion could be pattern-matched from a role instead of read from the thing. Named for D&C 9:8.
---

# Study It Out

> "you must **study it out in your mind**; then you must ask me if it be right." — [D&C 9:8](https://www.churchofjesuschrist.org/study/scriptures/dc-testament/dc/9?lang=eng)

## The failure this prevents

A reviewer with no grounding produces output that is **structurally correct but factually invented** — a review that *reads* right without having read the artifact. A **cold-start subagent** is most prone to it: given only a role and a folder path, it pattern-matches from its role definition and fabricates a plausible verdict. But the orchestrating session does it too, under time pressure, when it "reviews" from memory of what the code *probably* says.

This is `read_before_quoting` extended from quotes to **judgments**. Close-enough wording is fabrication; a close-enough review is fabrication too.

## The discipline

Before you render — or dispatch — any analytical verdict (review, critique, eval, assessment, "looks good", "that's the bug"):

1. **Study it out first.** Read the actual artifact *this session* — the real diff, the real file, the real log. Not your memory of it, not its name, not its role description.
2. **Cite or it didn't happen.** Every finding references a specific `file:line` / section. *An ungrounded review can't cite real lines* — so an uncited verdict is the fabrication smell. N findings → N references (the cite-count rule, applied to reviews).
3. **Confirm the artifact is real before reviewing it.** Missing or placeholder input *is* the finding — don't review around a void.
4. **Keep apex discernment with the context-holder.** The whole-picture judgment ("does this serve the intent?") stays with whoever holds the whole arc. Dispatch grounded *narrow* checks, not the judgment that needs full context.
5. **If you must hand off, equip the witness.** Package the real artifacts (full paths, the procedure, the work item) so the next session studies it out instead of starting cold.

## Say WHICH artifact

Reading the artifact is half the rule. The other half is naming *which one*, because every reference to a mutable thing is ambiguous until it carries a version. Three instances in one hour, on one project:

1. **A bare `file:line`.** Two people cited one fact at three different line numbers inside an hour, and **neither was wrong** — one had read HEAD, the other the shared working tree mid-edit. In a shared checkout, HEAD, `origin/main`, and the uncommitted tree are three different documents, and a bare `file:line` silently picks one.
2. **An unstamped claim about a moving ref.** Someone said a commit "isn't on origin." Their fetch and a colleague's push raced, so afterwards *neither of them could falsify it*. Publicly asserting the state of a shared mutable ref without an instant attached is unfalsifiable by construction.
3. **An instrument answering the neighbouring question.** `git log <ref> -- <path>` ("which commits touched this path") was read as branch containment ("does this ref contain that commit"). `git branch -r --contains` was the question meant. The output was correct and about something else.

> **Cite the artifact, not just the position.** Recite by symbol where the symbol is stable; stamp the ref where it is not; and when an instrument disagrees with a person, check whether you are both describing the same version before deciding who is wrong.

The third instance is the general trap, and it is one step subtler than the others: *an instrument answering an adjacent question looks exactly like an instrument answering yours.*

## When it applies / when it doesn't

- **Applies** to *analytical* output: reviews, critiques, evaluations, source assessments, "is this right?" verdicts — yours or a dispatched agent's.
- **Does not gate** *grounded, verifiable execution*: file moves, code edits that will be diffed, search results, build/test runs. Those are safe to dispatch cold — their output is checkable by inspection. The line is **judgment vs. execution** — the same line as "delegate execution, not discernment."

## The tell

If you can't point at the line, you didn't study it out — you guessed. The burn is counterfeit when the study was skipped.

## It cuts both ways

Unverified **skepticism** is as ungrounded as unverified **credulity**. Flagging a claim as "tradition," "unsupported," or "presented as fact" *without checking the source* is the same failure as asserting it without reading — you've rendered a verdict from your prior, not the artifact. Verify before you rule, in *either* direction. (Learned live, 2026-06-07: a yt-gospel eval flagged the Wilford Woodruff St. George founders account as "⚠ tradition"; the user pushed; the Church's own 1991 Ensign Q&A and Woodruff's journal documented it plainly. The skeptical ruling was the ungrounded one.)

## Relation
- Extends the read-before-quoting discipline from quotes to judgments.
- [oracle-craft](../oracle-craft/SKILL.md) is the build-side sibling: this skill says read the thing, that one says how to build a check that reads it and can actually fail.
- The same discipline can be built into automated pipelines as a hard gate: no verdict ships until the evidence of actually reading the artifact is attached.
- Sibling of the full-context-shepherd lesson and the critic architecture.
