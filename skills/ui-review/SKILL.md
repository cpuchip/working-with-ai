---
name: ui-review
description: Structured fresh-eyes design review of any UI — screenshot-driven critique that produces ranked, concrete findings tied to the ui-craft lexicon. Use when the user asks to review/critique/improve a UI, says something "looks off / feels bolted on / isn't working", before shipping any user-facing surface, or after substantive UI changes. Works on live URLs (playwright-cli), local dev servers, and screenshots they paste. Run any deterministic UI-lint oracle you have FIRST, then the judgment passes. Companion: ui-craft (the system the review measures against), tufte (if charts are present).
---

# ui-review — the fresh-eyes critique loop

A review is measurements first, judgment second, and every finding lands as a **concrete fix**
("padding 12→16 on `.card`, kill the inner border"), never as "improve the visual hierarchy."
Findings cite the lexicon term they serve — that's how the shared vocabulary compounds.

## Protocol

### 0. Oracle first
```sh
python scripts/ui-lint/ui_lint.py <url>          # the deterministic floor
```
Machine findings (contrast, tap targets, off-scale spacing, palette sprawl…) come free —
never spend judgment on what the oracle already caught. Attach its summary to the review.

### 1. Capture — three widths, key states
```sh
npx playwright-cli open <url>
npx playwright-cli resize 390 844   && npx playwright-cli screenshot   # phone
npx playwright-cli resize 834 1112  && npx playwright-cli screenshot   # tablet
npx playwright-cli resize 1440 900  && npx playwright-cli screenshot   # desktop
```
Then capture the states that hide problems: an empty state, a loading moment if reachable, an
error (bad input), dark mode if the app has it, and one "full" state (long text, many items —
where truncation and overflow live). `snapshot` gives the accessibility tree — check names/roles
while there.

### 2. The squint pass (hierarchy)
Blur your reading of the desktop screenshot (literally squint / shrink it): what survives?
- Exactly one primary thing should survive per view. None = flat; several = shouting.
- Do groups read as groups (proximity), or does it blur into an even field?

### 3. The lines pass (alignment)
Trace the left edges, top edges, gutters. Every edge should share a line with another element.
Flag every *almost*-aligned edge (2–6px off) — those are defects, not style.

### 4. The scale pass (spacing + type)
- Count distinct gap sizes doing the same job (card padding, row gaps) — more than one = drift.
- Count font sizes and weights in view — >4 sizes or half-step jumps (16→17, 400→500) = drift.

### 5. The color pass
- Count colors doing *emphasis* work — more than one accent = sprawl.
- Any gray-on-gray that matters? Any status carried by color alone?
- Layers: do bg/surface/raised actually separate, or is it one muddy field?

### 6. The states + interaction pass (the ux agent's ground)
Loading/empty/error/success present and designed? Focus-visible on everything interactive?
Primary action obvious and consistent across views? (Deep interaction critique → the ux agent's
checklist; this pass just catches the visible gaps.)

### 7. The copy pass
Labels ≤3 words; messages say what to DO, not what went wrong; no jargon leaking from the
backend (`ERR_CONN_REFUSED` → "Can't reach the server — retrying").

## Output format

```markdown
## UI review — <surface> (<date>)
**Oracle:** ui-lint X hard / Y advisory (attached)
**Verdict in one line:** <e.g. "solid bones, spacing drift + accent sprawl are 80% of the 'off' feeling">

### Findings (ranked by visual payoff per effort)
1. **[uncluttered] Card borders → whitespace.** 6 bordered boxes organize what spacing can.
   Fix: kill `.card` border, gap 16→24, keep --shadow-1. (biggest single win)
2. **[sharp] Body text is n-6 gray on n-1 bg (3.8:1).** Fix: --ink for body, --ink-soft only for meta.
3. …

### Knobs I'd turn (summary for steering)
- borders −6 · accents 3→1 · paddings reconciled to --s-4 · …

### Vocabulary note (one per review)
"Optical alignment": the play icon is mathematically centered but LOOKS right-shifted —
triangles need a 1–2px optical nudge. Where it applies here: …
```

## Rules

- **Rank by payoff-per-effort** — the top 3 findings should carry most of the "off" feeling.
  A review with 25 equal-weight findings is a review nobody acts on.
- **Every finding names its lexicon term** — the review teaches the vocabulary as it goes.
- **Fixes are diffs-in-prose** (selector + token + value), so the dev pass is mechanical.
- **One vocabulary note per review** — exactly one, so it lands.
- **Fresh eyes are real**: review the *screenshots*, not the code first — the code biases you
  toward what was intended over what is seen. Code comes second, to locate fixes.
- If the surface has charts/data viz, run the `tufte` skill's checklist on those specifically.
- Pre-ship or forms/inputs/motion-heavy surfaces: add a `web-interface-guidelines` rules pass
  (vendored Vercel rules — interaction-correctness details the lexicon doesn't cover) and, for
  public-facing pages, a `web-quality-audit` perf/a11y pass. Both report file:line findings
  that merge into this review's ranked list.
- Re-review after fixes with the same protocol (inverse hypothesis: the finding should be gone
  in the new screenshot, and ui-lint should stay/turn green).
