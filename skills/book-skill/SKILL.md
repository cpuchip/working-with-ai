---
name: book-skill
description: Distill a book you own into a load-on-demand agent skill — a ≤4k-token SKILL.md of mental models plus ~1k-token chapter files, glossary, patterns, and cheatsheet — with a quote-verification gate so the skill never misquotes its source. Use when a book will be revisited while working; skip one-off reads. Third-party book skills stay private.
---

# book-skill — the book becomes a colleague, not a context dump

A book dumped into context is paid for on every prompt and too big to query
well. A book distilled once into a structured skill is queried at ~1k tokens
a question. The shape below is adapted from the open book-to-skill pattern
(virgiliojr94, MIT); the verification rails are this house's, because **a
book skill that misquotes is a lie wearing scholarship's clothes** — and the
whole point of keeping the book beside you is trusting what it says.

## When to use / when to skip

USE for a book you will revisit while working — frameworks you apply, rules
you cite, models you think with. SKIP for one-off reads (a digest is
enough), for books whose value is narrative rather than operational, and for
sources you don't own. **Third-party book skills never leave the box** —
you hold reading rights, not distribution rights. Openly-licensed and
in-house material may ship within its license.

## The output shape (token budgets are the design)

```
skills/<book-slug>/
  SKILL.md        ≤4k tokens — the book's mental models, core frameworks,
                  when-to-reach-for-it, and a CHAPTER INDEX (the router)
  chapters/NN-<slug>.md   ~1k tokens each — loaded only when relevant
  glossary.md     ~1.5k — terms with chapter refs
  patterns.md     ~2k — techniques/algorithms/anti-patterns with chapter refs
  cheatsheet.md   ~1k — decision tables, quick rules
```

The budgets ARE the architecture: SKILL.md routes, chapters carry the depth,
nothing loads until asked for. Structure once; stop paying the
discovery-loop tax (re-navigating a PDF's table of contents per question).

## The pass

1. **Extract** clean text locally (pdftotext / pypdf / docling for
   table-heavy technical works). No book bytes leave the machine.
2. **Chapter** it — by the book's own structure when it has one; by topic
   segmentation when it doesn't (draft copies often need this). Keep the
   book's page or section numbers attached to every extracted claim.
3. **Distill upward**: chapters first, then patterns/glossary/cheatsheet
   from the chapters, then SKILL.md from everything — the index is written
   LAST, when you know what it must route to.
4. **★ The quote gate (non-negotiable).** Every direct quotation in every
   output file is verified verbatim against the extracted text before it is
   written — grep the source for the exact string; if it isn't there
   character-for-character, paraphrase WITHOUT quotation marks instead. A
   faithful paraphrase is honest; a close-enough quote is fabrication. If
   the house has a quote-checking tool, run it over the finished bundle as
   the exit gate.
5. **Provenance on every claim**: chapter + page/section ref, so a reader
   can walk back to the book. A skill that can't point home can't be
   audited, and unaudited digests drift into confabulation.
6. **Smoke it**: ask three questions whose answers you know are in specific
   chapters; confirm the skill routes to those chapters and answers from
   them — not from the model's priors. (Ask one question the book does NOT
   answer, and confirm the skill says so rather than inventing — a book
   skill that can't say "the book doesn't cover this" is a mirror.)

## Keep the shelf curated

Every ingested book is a standing entry in the skills list. A handful of
operational books beats a library of noise — dozens of book skills is a
retrieval job wearing skill clothing, and belongs in a knowledge base
instead. Re-run the pass when you get a better edition; delete skills for
books you stopped reaching for.
