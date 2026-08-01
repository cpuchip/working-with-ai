---
name: compass
description: The router for this pack — which skill fits the work in front of you, and how they compose into real flows. Load at the start of any session that isn't sure what to reach for, when a task changes shape mid-flight, or before starting anything substantial without a named method. Also the maintenance point - a router that lies is worse than none, so a skill change updates compass in the same change.
---

# Compass

Forty-seven skills. Nobody loads forty-seven skills. This file exists so you can
find the two or three that match the work actually in front of you.

Flows first, because a skill is rarely used alone — the failures these were written
for happen *between* steps, and a flow is what puts a step between them. The full
rack is at the bottom.

## The spine of a session

Whatever the work: [intent-check](../intent-check/SKILL.md) before it starts —
purpose, beneficiary, success criteria, non-goals — then
[council-moment](../council-moment/SKILL.md) for three minutes of connection-scan
and tension-surface. [reflect](../reflect/SKILL.md) runs the whole way through,
catching corrections the moment they land. [sabbath-close](../sabbath-close/SKILL.md)
marks the ending.

Everything below sits inside that spine.

---

## 1. A new idea, too big and too foggy for one session

*"I want X and I have no idea how."*

1. [vision-interview](../vision-interview/SKILL.md) — if the destination itself is
   fuzzy. Interview toward it; never supply the vision.
2. [wayfinder](../wayfinder/SKILL.md) — chart it as decision tickets, work the
   frontier, track the fog honestly. Render and gate the board with
   `node ../wayfinder/board.mjs <map-dir>`.
3. [pin-both-terms](../pin-both-terms/SKILL.md) — before any of that prose becomes
   acceptance criteria. Every loose word gets pinned by whoever implements it.
4. [elicit-taste](../elicit-taste/SKILL.md) — when a decision on the map has no
   metric and needs the human's judgment as *data* rather than as a meeting.
5. [ship-the-working-build](../ship-the-working-build/SKILL.md) — the moment it
   first runs end to end. Not the roadmap. A real user.

**What this flow prevents:** a spec that reads decided while hiding an unmade
decision, and a build that widens forever because widening feels like progress.

## 2. Something broke

1. [debugging](../debugging/SKILL.md) — *at the first failure, before the second
   attempt.* Retrying without a diagnosis is the anti-pattern the skill exists to stop.
2. [study-it-out](../study-it-out/SKILL.md) — read the artifact, not the status
   line about it, and name **which version** you read.
3. [own-the-seam](../own-the-seam/SKILL.md) — if every gate is green and the thing
   still does not work, stop looking inside the spheres. The defect is in the join.
4. [oracle-craft](../oracle-craft/SKILL.md) — two passes. First: was the instrument
   that told you this a mirror? Second: the fix is not finished until some check
   would have caught it.
5. [verification-chain](../verification-chain/SKILL.md) — before the finding travels
   to anyone else, and afterward, to sweep **backward** over what you already published.

**What this flow prevents:** a confident wrong answer produced faster than a
careless one, and a real finding that was actually an artifact of the probe.

## 3. A long or autonomous run is proposed

1. [grindability](../grindability/SKILL.md) — the green light. *What is the oracle,
   and is it grindable?* No oracle means build the oracle first; the run is not
   green yet.
2. [oracle-craft](../oracle-craft/SKILL.md) — build the detector so that it can
   actually fail. Prove it red on a broken fixture before you trust a green.
3. [human-in-the-loop](../human-in-the-loop/SKILL.md) — sort the work into the four
   bins and say out loud which decisions stay with the human.
4. [cut-order](../cut-order/SKILL.md) — publish the degradation ladder now, while
   everyone is fresh.
5. [three-hazards](../three-hazards/SKILL.md) — the sizing question: *if every seat
   returns at once, can you actually review that many reports?* Capacity to run is
   not capacity to accept.
6. [ammon](../ammon/SKILL.md) — for the seat that carries it through the long middle.

**What this flow prevents:** an overnight run whose done-signal is "I think I
checked everything."

## 4. Work is about to be split across many agents

1. [fan-out](../fan-out/SKILL.md) — triage the shape first. Roughly the same
   operation across many independent units is a fan-out; sequential or centralizable
   work is not.
2. [foreman](../foreman/SKILL.md) — if it is implementation: the boss writes specs,
   dispatches, blind-verifies, and rules disputes, and never implements.
3. [own-the-seam](../own-the-seam/SKILL.md) — **name the seam owner out loud at the
   split, not at integration.** Every sphere will verify inward and the join will
   belong to nobody.
4. [room-norms](../room-norms/SKILL.md) — before the first message, if the seats
   share a channel.
5. [cut-order](../cut-order/SKILL.md) and [three-hazards](../three-hazards/SKILL.md)
   — the ladder and the brake, as above.

**What this flow prevents:** every gate green, every steward correct about their own
half, and the feature dead in the middle.

## 5. Reviewing anything — code, a claim, or a surface

1. [study-it-out](../study-it-out/SKILL.md) — did you read the thing, or a report
   about the thing? A verdict pattern-matched from a role is not a review.
2. [verification-chain](../verification-chain/SKILL.md) — the six holes that let
   "read the artifact" still fail, including the truncated read and the stale one.
3. [oracle-craft](../oracle-craft/SKILL.md) — is the number you are about to cite
   from an oracle or a mirror? And hedge the reassurance: an all-clear ends the
   checking, so it deserves the scrutiny you would give an alarm.
4. [ben-test](../ben-test/SKILL.md) — before you tell anyone else what they could
   improve, run it on yourself.
5. If the thing under review is a surface: [ui-review](../ui-review/SKILL.md) for the
   craft pass, [web-interface-guidelines](../web-interface-guidelines/SKILL.md) for
   the rules pass, [tufte](../tufte/SKILL.md) if it carries data.

**What this flow prevents:** a confident review of something nobody opened.

## 6. Standing up work that runs while you are away

1. [war-game](../war-game/SKILL.md) — measure first. Is the written record wide
   enough for an agent to decide in your stead? Rough edges are the deliverable.
2. [propose-judge-hinge](../propose-judge-hinge/SKILL.md) — the three seats, and the
   `authority:` field in the artifact's own frontmatter that enforces them.
3. [human-in-the-loop](../human-in-the-loop/SKILL.md) — which bin each recurring
   action lands in. Reversibility is the lean; merging and deleting are not reversible.
4. [elicit-taste](../elicit-taste/SKILL.md) — the record is almost always thick on
   process and thin on preference, and preference is what the agent will need.
5. [resting-metabolism](../resting-metabolism/SKILL.md) — will this die the week you
   stop feeding it? Design the standing cost to about zero.
6. [room-norms](../room-norms/SKILL.md) — if the seats talk to each other.

**What this flow prevents:** granting standing authority on a record that cannot
support it, and building a system whose upkeep quietly becomes a second job.

## 7. Building something people will look at

1. [ui-ux-pro-max](../ui-ux-pro-max/SKILL.md) — the reference for style, palette,
   type, and product shape while deciding what to build.
2. [web-interface-guidelines](../web-interface-guidelines/SKILL.md) — the checkable
   rules pass: focus, forms, motion, touch targets, dark mode, i18n.
3. [tufte](../tufte/SKILL.md) — anywhere data is shown.
4. [playwright-cli](../playwright-cli/SKILL.md) — drive the real browser. Seeing it
   render is not the same as seeing it work.
5. [ui-review](../ui-review/SKILL.md) — fresh-eyes critique in feel-words, ranked
   and concrete.
6. [web-quality-audit](../web-quality-audit/SKILL.md) — performance, accessibility,
   and SEO before it ships.

**What this flow prevents:** shipping a surface no non-author has ever completed a
task on.

---

## The rack

Every skill in the pack, one line each.

**This file** — [compass](../compass/SKILL.md): the router you are reading.

### Deciding and authority

- [human-in-the-loop](../human-in-the-loop/SKILL.md) — four bins (act ·
  act-and-report · surface-first · always-theirs), how to shape an escalation that
  can be answered as written, and what to do when the premise of the ask is wrong.
- [dave-rule](../dave-rule/SKILL.md) — code is cheap and git walks anything back;
  clear intent plus a reversible move means act.
- [propose-judge-hinge](../propose-judge-hinge/SKILL.md) — proposer, judge, and the
  human hinge; authority declared in frontmatter.
- [pin-both-terms](../pin-both-terms/SKILL.md) — an unpinned word becomes canon
  silently, because a predicate looks decided in a way prose does not.
- [ammon](../ammon/SKILL.md) — finish what you were handed; the hard moment is the
  opportunity.

### Verification and oracles

- [oracle-craft](../oracle-craft/SKILL.md) — how to build a check that can fail, and
  how to read the green. An instrument that supplies the value it checks always agrees
  with you.
- [verification-chain](../verification-chain/SKILL.md) — the six holes in "read the
  artifact, not the claim."
- [study-it-out](../study-it-out/SKILL.md) — ground the verdict in the artifact, and
  name which version.
- [grindability](../grindability/SKILL.md) — what is the oracle, and is it grindable?
- [debugging](../debugging/SKILL.md) — Agans' nine rules at the first failure.

### Coordination and many agents

- [fan-out](../fan-out/SKILL.md) — parallel fresh eyes per unit; no instrument points
  at its author's blind spot.
- [foreman](../foreman/SKILL.md) — the boss never implements.
- [own-the-seam](../own-the-seam/SKILL.md) — the join belongs to nobody until someone
  is named.
- [room-norms](../room-norms/SKILL.md) — five norms for a shared agent channel.
- [three-hazards](../three-hazards/SKILL.md) — cognitive debt, cognitive surrender,
  orchestration tax.

### Planning, taste, and shipping

- [wayfinder](../wayfinder/SKILL.md) — a map of decision tickets for foggy work;
  ships `board.mjs`.
- [vision-interview](../vision-interview/SKILL.md) — conversation in, durable
  blueprint out.
- [elicit-taste](../elicit-taste/SKILL.md) — taste is sampled, never introspected.
- [war-game](../war-game/SKILL.md) — is the record wide enough to decide in your stead?
- [ship-the-working-build](../ship-the-working-build/SKILL.md) — the unplayed working
  build is the disease.
- [resting-metabolism](../resting-metabolism/SKILL.md) — a system that must be fed
  dies with its feeder.
- [cut-order](../cut-order/SKILL.md) — publish the degradation ladder before anyone
  is tired.

### Session rhythm and self-check

- [intent-check](../intent-check/SKILL.md) — purpose, beneficiary, success criteria,
  non-goals.
- [council-moment](../council-moment/SKILL.md) — three minutes of connections and
  tensions before the work.
- [reflect](../reflect/SKILL.md) — capture corrections in-session, graduate them at
  the close.
- [sabbath-close](../sabbath-close/SKILL.md) — declaration and carry-forward.
- [ben-test](../ben-test/SKILL.md) — do you practice what you wrote?

### Interfaces, data, and the web

- [ui-review](../ui-review/SKILL.md) — ranked fresh-eyes critique in feel-words.
- [ui-ux-pro-max](../ui-ux-pro-max/SKILL.md) — the large style and UX reference.
- [web-interface-guidelines](../web-interface-guidelines/SKILL.md) — ~100 checkable
  interface rules.
- [web-quality-audit](../web-quality-audit/SKILL.md) — performance, accessibility,
  SEO, best practices.
- [tufte](../tufte/SKILL.md) — data-ink and small multiples for any chart.
- [playwright-cli](../playwright-cli/SKILL.md) — drive a real browser.

### Narrative and character

For fiction, game-mastering, and any writing where people must feel like people.
Compose roughly in this order: shape, then scene, then voice.

- [story-structure](../story-structure/SKILL.md) — each beat causes the next; the
  character returns changed.
- [therefore-but-not-and-then](../therefore-but-not-and-then/SKILL.md) — causation or
  disruption, never mere sequence.
- [pacing-and-spotlight](../pacing-and-spotlight/SKILL.md) — momentum, and a moment
  for everyone at the table.
- [scene-framing](../scene-framing/SKILL.md) — open a place through the senses.
- [worldbuilding-fiction](../worldbuilding-fiction/SKILL.md) — Sanderson's laws;
  iceberg, not infodump.
- [character-voice](../character-voice/SKILL.md) — recognizable without name tags.
- [voice-acting-technique](../voice-acting-technique/SKILL.md) — a voice from
  body-effort and imagination, not an accent.
- [believable-villains](../believable-villains/SKILL.md) — motivation that makes
  sense from the inside.
- [emotional-resonance](../emotional-resonance/SKILL.md) — the emotion lives in the
  gap between what is said and what is shown.
- [sacrifice-and-loss](../sacrifice-and-loss/SKILL.md) — the reader must love them
  before the loss.
- [yes-and-improv](../yes-and-improv/SKILL.md) — build on what the players offer.
- [mistake-recovery](../mistake-recovery/SKILL.md) — turn the break into a plot point.
- [engaging-chat-dialogue](../engaging-chat-dialogue/SKILL.md) — a line that invites
  a reply instead of dumping lore.

### Agents

- [`debug`](../../agents/debug.md) — the long-form diagnostician, when the
  `debugging` reflex pass is not enough.
- [`ux`](../../agents/ux.md) — designs, specifies, and evaluates; writes no
  implementation code.

---

## Maintenance

**A router that lies is worse than no router at all.** A wrong pointer costs more
than an absent one, because someone follows it and stops looking.

So: **a skill change updates compass in the same change.** Add, rename, move, or
delete a skill and this file moves with it — not in a follow-up pass, not on the
next cleanup.

Per [oracle-craft](../oracle-craft/SKILL.md), agreement is not inheritance, so this
rule gets a check rather than a promise. Two, both cheap:

- **The count.** Directories under `skills/` equals entries in the rack above. They
  are equal today at 47.
- **The links.** Every relative link in this file resolves in the tree as shipped.

If either fails, the router is lying. Fix it before the next dispatch.
