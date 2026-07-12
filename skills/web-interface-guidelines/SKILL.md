---
name: web-interface-guidelines
description: Audit UI code against Vercel's Web Interface Guidelines — ~100 terse, checkable rules covering accessibility, focus states, forms, animation, typography, content handling, touch targets, safe areas, dark mode, i18n, and hydration safety. Use when reviewing UI code for compliance ("review my UI", "check accessibility", "audit UX details"), as the rules-pass companion to ui-review (which covers visual craft) and ui-lint (the deterministic oracle).
metadata:
  upstream: https://github.com/vercel-labs/web-interface-guidelines (MIT)
  vendored: 2026-07-07
---

# Web Interface Guidelines (Vercel) — local rules pack

The full rule set lives in [guidelines.md](guidelines.md) in this directory — **vendored
locally** so reviews are deterministic and work offline. Upstream is
`vercel-labs/web-interface-guidelines` (`command.md`); refresh occasionally with:

```bash
curl -sL https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md \
  -o .claude/skills/web-interface-guidelines/guidelines.md
```

## Procedure

1. Read `guidelines.md` (the whole file — it is ~180 lines of terse rules grouped by
   section: Accessibility, Focus States, Forms, Animation, Typography, Content Handling,
   Images, Performance, Navigation & State, Touch & Interaction, Safe Areas & Layout,
   Dark Mode & Theming, Locale & i18n, Hydration Safety, Hover States, Content & Copy,
   Anti-patterns).
2. Read the target files (user-specified, or the components you just built/changed).
3. Check every rule against the code. These rules are *checkable* — each maps to a
   concrete pattern you can grep or read for (e.g. `outline-none` without a focus
   replacement, `transition: all`, missing `autocomplete`, straight quotes in copy,
   `onPaste` + `preventDefault`).
4. Report findings grouped by file in `file:line` format (clickable), terse, no
   explanations unless the fix is non-obvious. Note `✓ pass` for sections with no
   findings so coverage is visible.

## How this composes with the house system

- **`ui-craft`** owns visual feel (the six knobs: spacing, type scale, color count,
  borders/shadows, density, motion). This skill owns *interaction correctness details*
  the knobs don't see.
- **`ui-review`** runs the ui-lint oracle first, then judgment passes — add this rules
  pack as an extra pass when the review is pre-ship or touches forms/inputs/motion.
- **`ui-lint`** stays the deterministic floor; these rules are the checkable-but-not-
  yet-scripted layer above it. Rules that fire repeatedly are candidates to graduate
  into `scripts/ui-lint`.
