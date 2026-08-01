---
name: grindability
description: The green-light triage for any long or autonomous work — ask "what's the oracle?" AND "is it grindable?" before committing to the shape. Use at the moment of green-lighting any overnight or unattended run, fan-out, "keep marching" arc, soak, migration walk, bulk verification, or agent-loop dispatch. Also triggers when sizing why an autonomous run underperformed. Companion to fan-out (the parallel shape).
---

# grindability — the oracle's twin

Distilled from a digest of Brandon Sanderson's conversation with Dwarkesh Patel
on AI and the future of math. Promoted to a skill so it fires at green-light
time instead of waiting to be remembered.

**Verifiable isn't the bar — grindable is.** An oracle tells you *whether* an attempt
succeeded; grindability is whether you can afford *many attempts*: cheap, deterministic,
side-effect-free retries — a sandbox you can reset, a test you can rerun, a build you can
throw away. Autonomy compounds exactly where both hold. Where each attempt touches the
world (rate limits, live sites, sends, spends, one-shot state), no oracle quality makes
long unattended grinding safe. The canonical contrast: a test suite in a resettable
sandbox is grindable; a rate-limited live site is not — no matter how good the check.

## The deflation check, before either question

Both questions below assume the work needs a *shape* — a loop, a harness, a fleet.
Check that assumption first, because the cheapest autonomous system is the one you
didn't build.

Theo Browne, in *"Everything we knew about software has changed"*, describes replacing
a service that triaged his pull requests with a plain instruction file run on a
schedule: a few sentences telling an agent which repositories to read, what to
prioritize, and where to write the result. His observation on the class:

> "You'd be amazed how many of these types of things can exist that are literally just
> a markdown file running on a cron."

— Theo Browne ([12:15](https://www.youtube.com/watch?v=xUnRQ9vLXxo&t=735))

That is an observation about what the tier shift made possible, not a rule. The rule
is ours, and it belongs at green-light time:

> **What is the smallest thing that could do this? Could it be a prompt file on a
> schedule?**

Ask it before designing anything. If the honest answer is yes, the oracle and
grindability questions get much easier — a prompt file is trivially resettable,
version-controlled, and cheap to rerun, so the shape lands in the top-left quadrant
almost by construction. If the answer is no, you have learned *why* the work needs a
harness, which is worth knowing before you build one.

The failure this catches is not building the wrong thing. It is building a
well-oracled, fully grindable, carefully staged system for a job that three sentences
and a scheduler would have done.

## The two questions, asked together

1. **What's the oracle?** The deterministic check that says pass/fail without you
   (build/test/lint/diff/exit-code). This skill green-lights the shape; its build-side
   sibling [oracle-craft](../oracle-craft/SKILL.md) is how you make that check one that
   can actually fail.
2. **Is it grindable?** Can attempt N+1 run immediately after attempt N failed, at ~zero
   cost, with no residue? (Reset-able sandbox · replayable input · idempotent target ·
   no external quota/party in the loop.)

## The four quadrants → what each green-lights

| | **oracled** | **no oracle** |
|---|---|---|
| **grindable** | ★ Let it run — autonomous goal loops, overnight runs, fan-out, retry-until-green. This is where autonomy compounds. | **Build the oracle first** — the detector is the actual first task; grinding without one just launders guesses. Build it well: [oracle-craft](../oracle-craft/SKILL.md). |
| **ungrindable** | Human-cadence checkpoints: act in small verified steps, surface between them. The oracle helps *judge* each step, but retries are expensive/dirty, so no unattended loops. (Deploys, live-DB migrations, anything where a probe against the live system is the only proof.) | Don't automate. Do it by hand with eyes on, or reshape the task until it moves quadrants. |

## Raising grindability is usually the real first task

Most "ungrindable" work is one artifact away from grindable — and building that artifact
beats grinding carefully:

- **Live system** → scratch container / disposable replica you can rebuild and replay
  against
- **One-shot state** → replay file / fixture / seeded world (e.g., a headless game
  driver replaying a recorded run)
- **External API with quotas** → recorded fixtures for the loop; the real call only at
  the final verify (the verify-on-the-real-path rule still applies to the *last* run)
- **Prod-only reproduction** → capture the failing input once, grind against the capture
- **Costly model calls** → grind the harness with a local/cheap model; the premium model
  only for the final pass

If no such artifact is buildable, that's the signal the work belongs on the user's
cadence — which is a scheduling fact, not a failure.

### The standing posture: build tools continuously

Raising grindability is not a move you make once, when a task is too big. It is a
posture: **always be looking for the tool that makes this work easier and more
deterministic**, and don't stop to ask permission to build a small one that removes
guesswork.

The evidence for treating it as standing rather than situational is what survives.
Across one long build, every wall hit produced two candidate outputs — an answer and a
tool — and the answers were obsolete within the hour while the tools were still in use
weeks later. A measurement script, a check that the pipeline actually said the words it
was given, a batch analyzer, a test of which knobs were even wired: none of those were
the task, and all of them outlived it.

Four rules that make the posture pay:

- **Prefer the tool that makes the *next* instance cheap over the one that solves
  *this* instance faster.** The second is almost always quicker today and worth less by
  the end of the week.
- **Deterministic beats clever.** A program that exits 0 or 1 outlives any judgment you
  render in prose, because it can be rerun by someone who wasn't there. Build it to
  fail honestly — see [oracle-craft](../oracle-craft/SKILL.md).
- **Prove the knob is wired before you trust the metric.** Same seed, changed input,
  compare outputs. A dial that quietly does nothing produces confident numbers, and a
  threshold nobody tested produces confident wrong ones. Two dead knobs and one dead
  threshold were found this way, each after being trusted for a while.
- **Write the failure into the tool's docstring.** The comment explaining *why* the
  cheap model's output lies is worth more than the fix, because the next person will
  otherwise re-derive the same trap. A tool with no recorded failure mode is a tool
  someone will misuse at full confidence.

## The companion mechanism: entropy collapse

Long solo grinding degrades: an autoregressive model marinating in its own prior outputs
loses diversity (each attempt more like the last — the same wrong idea, retried politely).
The fix lives at the **prompt level, not the sampler**: fresh eyes per attempt (fan-out),
or **opposed mandates** (one attempt told to attack what the previous defended). This is
*why* council beats solo and why the `fan-out` skill's fresh-context-per-unit shape
out-performs one tiring serial operator on grindable work.

## Applying it (30 seconds at green-light)

1. Name the oracle. None? → building it is step 1 (or the work isn't autonomous yet).
2. Name the reset. "How do I cheaply undo/rerun attempt N?" No answer? → name the
   artifact that would create one, or drop to human-cadence checkpoints.
3. Pick the shape: grindable+oracled → autonomous loop / fan-out / overnight; add opposed
   mandates if attempts will iterate on each other.
4. Say the classification out loud in the green-light message — "grindable+oracled
   (sandbox X, oracle Y), letting it run" — so the shape is auditable.
