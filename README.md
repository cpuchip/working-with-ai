# working-with-ai

A shareable, genericized toolkit for collaborating with AI coding agents — the
*method* behind a large body of human-AI work, offered as a template. Installable
as a Claude Code plugin.

This is not a framework or a library. It's a set of **skills, agent patterns, and a
bilateral covenant** that encode how to work *with* an agent so the output is
honest, verified, and sound — and how to orchestrate many agents without losing the
watch over them.

## What's inside (as it fills — see `skills/` and `agents/`)

- **The bilateral covenant** (`covenant.template.yaml`) — the heart. Constitutional
  AI is unilateral (rules imposed on the model); this is *bilateral*: both the human
  and the agent commit, and breach degrades the work as natural consequence, not
  punishment. Fill the placeholders with your own lived incidents — the anecdotes
  are what give clauses their weight.
- **Stewardship & autonomy** — when the agent should act vs. surface a question
  (the four-bin rubric), and how "code is cheap, git walks back" changes the
  act-vs-ask line.
- **The oracle & grindability discipline** — before any long autonomous run, ask
  "what's the deterministic check?" and "can it run many cheap side-effect-free
  attempts?" Autonomy compounds only where both hold.
- **The foreman pattern** — a boss agent that writes the spec + constitution,
  staffs cheaper worker agents, verifies BLIND, and never implements. Merge trains
  end with a build oracle on merged main (the boss's own fingers are the one worker
  no checker was watching).
- **Finish what you're handed** — carrying a delegation to completion; the hard
  moment is the opportunity, not the cue to quit.

## Install (Claude Code)

```
/plugin marketplace add cpuchip/working-with-ai
/plugin install working-with-ai
```

Or test locally: `claude --plugin-dir ./working-with-ai`

## Copilot

Mirrored under `.github/` (`.github/skills/`, `.github/agents/`, `AGENTS.md`) — same
patterns, Copilot's file names.

## Provenance

Distilled from an ongoing human-AI collaboration (2026). The specific instance —
one person's memory, voice, and covenant — stays private; what's here is the
reusable shape, cleaned of the personal. Companion release: `scripture-study` (the
same method applied to scripture study, with the gospel tools).
