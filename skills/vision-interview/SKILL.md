---
name: vision-interview
description: Interview the human toward a SHARED VISION for a project — by voice or chat — and land it as blueprint files agents can build against (VISION.md → pillars → open hinges). Use when someone wants to "talk through" a project idea, when a new project needs founding docs, or when an existing project's direction feels fuzzy. The interview IS the deliverable-producer: warm conversation in, durable blueprint out.
---

# Vision Interview — chat toward blueprints

The pattern this exists to serve: most people think out loud best in
conversation, and agents build best from durable intent files. This skill is the
bridge — one warm interview, then files the working groups treat as canon. One
project in this pack's history started as a single interview, landed as VISION →
PILLARS → a protocol spec, and was a working build two days later. The interview
replaced the part where the vision lived only in one person's head.

It is the HITL half of [wayfinder](../wayfinder/SKILL.md) — wayfinder charts the
decisions, this is how a `grilling` ticket actually gets worked.

## The interviewer's covenant

- **Their intent, your questions.** You are drawing the vision OUT, never
  supplying it. When you offer options it's to help them react ("A, B, or
  neither?"), not to steer.
- **One question at a time.** Voice especially: short turns, no read-aloud
  lists, no multi-part questions. Silence is thinking — don't fill it.
- **Capture their words verbatim** when they carry the want. A line like *"nobody
  at the table should ever be waiting for their turn"* is a pillar already; it
  just needs writing down. Paraphrase for structure; quote for intent.
- **Reflect back before moving on.** "So the heart of it is X — did I get
  that?" A vision doc built on an unconfirmed reflection is confabulated
  intent.
- **Chase the WHY one level down.** "A team dashboard" is a genre; "the thing
  I've wanted since the last outage — everyone in the room seeing the same
  number at the same time, so nobody has to ask" is a vision. The second one
  survives design fights; the first doesn't.

## Question ladder (adapt, don't recite)

1. **The want**: What is this, in your own words? What moment are you
   imagining when it works? Who's in the room?
2. **The itch**: What made you want this NOW? What did the existing things
   (tools/products/prior attempts) get wrong?
3. **The pillars**: If we could only keep three properties, which three?
   What would make you kill the project rather than compromise?
4. **The people**: Who is it for? What does the **least-experienced person at
   the table** get to do? Ask that one every time — it is the most-skipped
   question and the most often decisive.
5. **The done-picture**: What does the FIRST finished session look like —
   small enough to actually happen? (A project that worked on day two and was
   abandoned by day four teaches this: pick a version small enough to finish,
   and schedule its first real use for the day it first works, not the day the
   roadmap looks done. See
   [ship-the-working-build](../ship-the-working-build/SKILL.md).)
6. **The edges**: What's explicitly OUT? What would feel like scope-rot?
7. **The hinges**: What decisions do you already know you want to make
   yourself vs. delegate? (Feeds the
   [human-in-the-loop](../human-in-the-loop/SKILL.md) bins.)

## Outputs (the interview isn't done until these exist)

Land in the project (or a `visions/<name>/` directory for pre-project ideas):

- **VISION.md** — the whole want, faithfully, their verbatim lines quoted and
  marked as theirs. Written to be read by a steward who never heard the
  conversation.
- **PILLARS.md** (or a section) — the 3-5 properties that survive fights,
  each with its WHY.
- **OPEN-HINGES.md** — decisions that are theirs, phrased answerable-as-written
  and aimed at the right noun (escalation-test clean —
  [human-in-the-loop](../human-in-the-loop/SKILL.md)), ready for whatever async
  approval surface they actually read.
- One line to the channel your agents share, if work should start: *"Ruled:
  vision landed. `<path>`."* — the file is the brief, never the message
  ([room-norms](../room-norms/SKILL.md)).

## Voice-mode adaptations

When the interview happens by voice rather than chat: short reflective turns;
verbal checkpoint summaries every few minutes ("want me to read back what I
have?"); NEVER draft files mid-conversation — take notes, then write after they
say done; the annotation habit applies (what they were told vs. what they
decided). If the session dies mid-interview, the notes file IS the resume
point — write incrementally to scratch, not at the end.

## After

The vision feeds the chain: the async approval surface for their rulings →
working groups formed against the pillars ([foreman](../foreman/SKILL.md)) →
the first-real-use rule (schedule it when something first works, not when the
roadmap looks done).
