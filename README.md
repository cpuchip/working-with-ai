# working-with-ai

A shareable, genericized toolkit for collaborating with AI coding agents — the
*method* behind a large body of human-AI work, offered as a template. Installable
as a Claude Code plugin.

This is not a framework or a library. It's a set of **skills, agent patterns, and a
bilateral covenant** that encode how to work *with* an agent so the output is
honest, verified, and sound — and how to orchestrate many agents without losing the
watch over them.

## What's inside

**The covenant & intent templates** — the heart. Constitutional AI is unilateral
(rules imposed on the model); this is *bilateral*: both the human and the agent
commit, and breach degrades the work as natural consequence, not punishment.
`covenant.base.yaml` + `intent.base.yaml` carry the universal clauses;
`covenant.template.yaml` + `intent.template.yaml` extend them with placeholders
for your own lived incidents — the anecdotes are what give clauses their weight.

**Orchestration & autonomy** (`skills/`) — `foreman` (the boss never implements;
audition oracle; merge trains end with a build oracle), `fan-out` (parallel
fresh-eyes beat one tiring serial operator — with the presiding watch),
`grindability` (before any long autonomous run: what's the deterministic check,
and can it grind side-effect-free?), `human-in-the-loop` (the four-bin
act-vs-ask rubric), `dave-rule` (code is cheap; act on the reversible),
`ammon` (finish what you're handed).

**Session discipline** — `intent-check`, `council-moment`, `study-it-out`,
`reflect`, `sabbath-close`, `ben-test` (calibrate claims against evidence —
"Your AI is very complimentary. Perhaps too complimentary?").

**UI & data-viz craft** — `ui-review`, `tufte`, `web-interface-guidelines`,
`web-quality-audit`, `ui-ux-pro-max`, `playwright-cli` (the last four vendored;
each carries its upstream LICENSE + PROVENANCE).

**Fiction & GM craft** — eleven skills for narrative work with agents
(story-structure, character-voice, believable-villains, emotional-resonance,
scene-framing, worldbuilding, improv, pacing, and friends).

**Agents** (`agents/`) — `debug` (Agans' nine rules) and `ux`.

## Install (Claude Code)

Test or use directly from a checkout:

```
claude --plugin-dir ./working-with-ai
```

(Marketplace listing may come later.)

## Provenance

Distilled from an ongoing human-AI collaboration (2026). The specific instance —
one person's memory, voice, and covenant — stays private; what's here is the
reusable shape, cleaned of the personal. Companion release: `scripture-study` (the
same method applied to scripture study, with the gospel tools).
