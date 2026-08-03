# working-with-ai

A shareable, genericized toolkit for collaborating with AI coding agents — the
*method* behind a large body of human-AI work, offered as a template. Installable
as a Claude Code plugin.

Forty-seven skills, two agents, and a bilateral covenant. Most of them were paid
for by a specific failure — several of the newest by failures inside a single
week — and the six adapted from other people's work say so on their own front page.

> **Sibling kit:** [ai-jumpstart](https://github.com/cpuchip/ai-jumpstart) is the
> harness-agnostic on-ramp — point *any* capable model (Claude, GPT, Gemini) at it
> and it sets up the same working discipline from zero. This repo is the deeper,
> Claude-Code-native pack. Start there if you're new; come here for the full kit.

## Why a skills pack

Two honest framings, because a pack of craft files invites two fair objections.

**The first: doesn't this decay?** Yes, and quickly. Addy Osmani names the two
halves of that problem *alpha* and *decay* — alpha being whatever you can currently
do that the models cannot, decay being the clock already running on it
([talk, 6:22](https://www.youtube.com/watch?v=n97BCfyFIvw&t=382)). An advantage
shaped like a capability has an expiry date built in. But he sets against it a
second measure a few minutes later: an edge may last about one model release, while
a *signature* — the credibility of whoever stands behind what shipped — outlasts it
by a long way ([13:18](https://www.youtube.com/watch?v=n97BCfyFIvw&t=798)). Read
this pack in that light. Individual techniques here will expire. The practice of
being able to account for your work does not, and most of what follows is that
practice wearing different clothes.

Osmani's operational rule is the one this whole pack is arranged around:

> "Explain it or don't ship it. And it's not because humans have to type every
> line or read every line, but because someone has to understand the work well
> enough to defend it."

— Addy Osmani, *"The engineer of the future is the person who is able to choose
what is worth doing"* ([AI Engineer,
16:17](https://www.youtube.com/watch?v=n97BCfyFIvw&t=977))

**The second objection is sharper: reading a skill file changes nothing.** That is
this pack's own hardest lesson, and it is stated plainly inside
[oracle-craft](skills/oracle-craft/SKILL.md):

> **You cannot inherit a lesson by agreeing with it. It only transfers when it
> becomes a check.** Agreement runs at read-time. Verification runs at 4am.

It was learned the embarrassing way — one steward published a real finding,
another read it, agreed with it out loud, and shipped the identical defect an
hour later. So the question to ask of any file here is not *do I agree with this*
but **what check now fails if I forget it?** If the answer is "none," it has not
transferred yet. Pick the two or three that match what you are building today,
turn those into assertions, and let the rest sit until they are needed.

**Still not a framework.** Nothing here imports anything; there is no runtime, no
build step, and no lock-in. Delete any file and the rest still works. One skill
now ships an executable oracle — [`board.mjs`](skills/wayfinder/board.mjs), which
renders a wayfinder map and validates its own invariants — but an oracle is a tool
a skill carries, not a platform you build on.

## Install (Claude Code)

```
/plugin marketplace add cpuchip/working-with-ai
/plugin install working-with-ai@working-with-ai
```

Or test directly from a checkout: `claude --plugin-dir ./working-with-ai`

## The covenant and intent

The heart of the pack, and the part to read first if you read only one thing.
Constitutional AI is unilateral — rules imposed on the model. This is
**bilateral**: both the human and the agent commit, and breach degrades the work
as natural consequence rather than punishment.

- [`covenant.base.yaml`](covenant.base.yaml) and [`intent.base.yaml`](intent.base.yaml)
  — the thin universal clauses, true in every collaboration.
- [`covenant.template.yaml`](covenant.template.yaml) and
  [`intent.template.yaml`](intent.template.yaml) — the same clauses with
  placeholders for your own lived incidents. Fill those in. The anecdote is what
  gives a clause its weight; a covenant with no scars is a poster.

## The rack

Every skill in the pack is listed here, one line each. If it is on disk it is in
this list, and if it is in this list it is on disk — that is the honest-inventory
promise, and [compass](skills/compass/SKILL.md) keeps the same promise for the
flows that compose them.

**Start here** — [compass](skills/compass/SKILL.md): the router. Which skill fits
the work in front of you, and how the rest compose into real workflows.

### Deciding and authority

Act or ask, and who is allowed to rule what.

- [human-in-the-loop](skills/human-in-the-loop/SKILL.md) — the four bins (act ·
  act-and-report · surface-first · always-theirs), how to shape an escalation
  that can actually be answered, and what to do when the premise of the ask is wrong.
- [dave-rule](skills/dave-rule/SKILL.md) — code is cheap and git walks anything
  back; when intent is clear and the move is reversible, act and commit.
- [propose-judge-hinge](skills/propose-judge-hinge/SKILL.md) — three seats for
  work done in someone's stead: a proposer that edits nothing, a judge that
  applies the safe subset, and the human who rules anything irreversible.
- [pin-both-terms](skills/pin-both-terms/SKILL.md) — a word left loose in prose
  will be pinned by whoever implements it, and the pin becomes canon silently.
- [ammon](skills/ammon/SKILL.md) — finish what you were handed; the hard moment is
  the opportunity, not the cue to quit.

### Verification and oracles

The instruments, and how to read the green they hand you.

- [oracle-craft](skills/oracle-craft/SKILL.md) — the detector's own design rules.
  Headline: an instrument that supplies the value it is asked to check will always
  agree with you.
- [verification-chain](skills/verification-chain/SKILL.md) — the six holes in
  "read the artifact, not the claim," each of which arrives wearing verification's
  clothes.
- [study-it-out](skills/study-it-out/SKILL.md) — ground the verdict in the
  artifact before rendering it, and name *which version* of the artifact you read.
- [grindability](skills/grindability/SKILL.md) — the green-light triage for long
  or autonomous work: what is the oracle, and is it grindable?
- [debugging](skills/debugging/SKILL.md) — Agans' nine rules as a reflex at the
  *first* failure, before the second attempt.

### Coordination and many agents

- [fan-out](skills/fan-out/SKILL.md) — when the work is N independent units,
  parallel fresh-eyes-per-unit beat one tiring serial operator; and no instrument
  points at its own author's blind spot.
- [foreman](skills/foreman/SKILL.md) — the boss never implements: specs,
  dispatch, the audition oracle for hiring seats, and a build oracle at the end of
  the merge train.
- [own-the-seam](skills/own-the-seam/SKILL.md) — the gap between two spheres
  belongs to nobody by construction, so name its owner out loud at the split.
- [room-norms](skills/room-norms/SKILL.md) — five norms for a shared agent
  channel, from a night where the corrections were never the cost; the ceremony was.
- [three-hazards](skills/three-hazards/SKILL.md) — the brake on multiplication:
  cognitive debt, cognitive surrender, and the orchestration tax.

### Planning, taste, and shipping

- [wayfinder](skills/wayfinder/SKILL.md) — plan work too big and too foggy for one
  session as a map of decision tickets with an honest fog list. Ships `board.mjs`.
- [vision-interview](skills/vision-interview/SKILL.md) — draw a shared vision out
  of a person by conversation and land it as blueprint files agents can build against.
- [elicit-taste](skills/elicit-taste/SKILL.md) — taste is sampled, never
  introspected; forced-choice decks and concrete-artifact reactions instead of
  "so what's your taste?"
- [war-game](skills/war-game/SKILL.md) — measure whether your written record is
  wide enough for an agent to decide in your stead. Rough edges are the
  deliverable, not a pass grade.
- [ship-the-working-build](skills/ship-the-working-build/SKILL.md) — the moment it
  first works, put it in front of a real user rather than opening the roadmap.
- [resting-metabolism](skills/resting-metabolism/SKILL.md) — a standing system
  that must be fed dies with its feeder; design for a resting cost of about zero.
- [cut-order](skills/cut-order/SKILL.md) — publish the degradation ladder at the
  start, so the 4am cut is not made by whoever is most attached to their own piece.

### Session rhythm and self-check

- [intent-check](skills/intent-check/SKILL.md) — purpose, beneficiary, success
  criteria, and non-goals, named before the work starts.
- [council-moment](skills/council-moment/SKILL.md) — three minutes of
  connection-scan and tension-surface before substantive work.
- [reflect](skills/reflect/SKILL.md) — capture corrections the moment they land,
  graduate them at the close.
- [sabbath-close](skills/sabbath-close/SKILL.md) — mark the ending: the
  declaration and the carry-forward.
- [ben-test](skills/ben-test/SKILL.md) — do you practice what you wrote? Named for
  the colleague who asked whether the AI was "perhaps too complimentary."

### Interfaces, data, and the web

- [ui-review](skills/ui-review/SKILL.md) — fresh-eyes design review producing
  ranked, concrete findings in a shared feel-word vocabulary.
- [ui-ux-pro-max](skills/ui-ux-pro-max/SKILL.md) — the large reference: styles,
  palettes, font pairings, and UX guidelines across ten stacks.
- [web-interface-guidelines](skills/web-interface-guidelines/SKILL.md) — the
  rules pass: ~100 terse checkable rules for accessibility, focus, forms, and motion.
- [web-quality-audit](skills/web-quality-audit/SKILL.md) — performance,
  accessibility, SEO, and best-practice audit of a live site.
- [tufte](skills/tufte/SKILL.md) — data-ink, small multiples, and the rest of
  Tufte applied to any chart or dashboard.
- [playwright-cli](skills/playwright-cli/SKILL.md) — drive a real browser to see
  the thing actually work.

### Narrative and character

Thirteen skills for fiction, game-mastering, and any writing where people have to
feel like people. They compose in roughly the order listed — shape first, then
scene, then voice.

- [story-structure](skills/story-structure/SKILL.md) — each beat causes the next
  and the character comes back changed.
- [therefore-but-not-and-then](skills/therefore-but-not-and-then/SKILL.md) —
  connect beats by causation or disruption, never by mere sequence.
- [pacing-and-spotlight](skills/pacing-and-spotlight/SKILL.md) — keep momentum and
  make sure everyone at the table gets a moment.
- [scene-framing](skills/scene-framing/SKILL.md) — open a place through the senses
  so it becomes somewhere rather than something.
- [worldbuilding-fiction](skills/worldbuilding-fiction/SKILL.md) — Sanderson's
  laws, cultural depth without lore-dumping, iceberg versus infodump.
- [character-voice](skills/character-voice/SKILL.md) — make each character
  recognizable across many scenes without name tags.
- [voice-acting-technique](skills/voice-acting-technique/SKILL.md) — build a voice
  from body-effort and imagination, not a funny accent.
- [believable-villains](skills/believable-villains/SKILL.md) — antagonists whose
  motivation makes sense from the inside.
- [emotional-resonance](skills/emotional-resonance/SKILL.md) — let the emotion
  live in the gap between what is said and what is shown.
- [sacrifice-and-loss](skills/sacrifice-and-loss/SKILL.md) — the reader must love
  the character *before* the loss, not because of it.
- [yes-and-improv](skills/yes-and-improv/SKILL.md) — build on what the players
  offer instead of defending your plan.
- [mistake-recovery](skills/mistake-recovery/SKILL.md) — turn a broken continuity
  into a plot point instead of a retcon.
- [engaging-chat-dialogue](skills/engaging-chat-dialogue/SKILL.md) — voice a
  character in a chat room so the line invites a reply instead of dumping lore.

## Agents

- [`agents/debug.md`](agents/debug.md) — the long-form diagnostician; Agans' nine
  rules run as a phased investigation when the `debugging` skill's reflex pass
  isn't enough.
- [`agents/ux.md`](agents/ux.md) — designs, specifies, and evaluates interfaces;
  deliberately writes no implementation code.

## Adapted and vendored skills

Six skills come from outside this collaboration. Each keeps its upstream `LICENSE`
and a `PROVENANCE.md` naming the source, the date, and exactly what was changed —
[playwright-cli](skills/playwright-cli/PROVENANCE.md),
[tufte](skills/tufte/PROVENANCE.md),
[ui-ux-pro-max](skills/ui-ux-pro-max/PROVENANCE.md),
[wayfinder](skills/wayfinder/PROVENANCE.md),
[web-interface-guidelines](skills/web-interface-guidelines/PROVENANCE.md), and
[web-quality-audit](skills/web-quality-audit/PROVENANCE.md). `wayfinder` is
adapted from Matt Pocock's skill of the same name
([github.com/mattpocock/skills](https://github.com/mattpocock/skills), MIT);
[three-hazards](skills/three-hazards/SKILL.md) borrows its three named hazards
from Addy Osmani's talk, cited inline throughout.

## Provenance

Distilled from an ongoing human-AI collaboration through 2026. The specific
instance — one person's memory, voice, private infrastructure, and covenant —
stays private; what is here is the reusable shape, cleaned of the personal.

A large share of the mid-2026 lessons — the oracle laws, the seam, the cut order,
the room norms — were paid for on one project: **emberdrive**, a bridge simulator
built by a fleet of agents against a hard morning deadline. Elsewhere in this pack
that night is described only as "one night's build," because a craft pack that
names one project forty times is a devlog. It is named once, here, so the evidence
has an address.

Companion release: `scripture-study` — the same method applied to scripture study,
with its own tools.

## License

MIT. See [LICENSE](LICENSE); vendored skills additionally carry their upstream
license in their own directory.
