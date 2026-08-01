---
name: resting-metabolism
description: A design law for standing agentic systems — a system that must be fed dies with its feeder, so build for a resting metabolism of about zero. Covers ride-along writes, trust-follows-the-read-path, the satellite / two-plane contract (append-only archives as the bus), and evolve-don't-sibling. Use when designing anything meant to keep running - a memory system, an always-on agent, a watcher, a daemon, a scheduled pipeline - or when deciding whether to add another store.
---

# Resting metabolism

## The law

**A system that must be fed dies with its feeder.**

Every agentic system in a four-generation lineage died of its metabolism, not its
architecture. The best-engineered one of them died the month its classifier's vendor
repriced. The most capable one never became the daily habit because its agentic side
billed by the hour of attention. The one that outlived them all was plain files — not
because files are elegant, but because **files cost nothing while idle.** They ride
sessions that were already going to happen.

None of those deaths were design failures in the usual sense. Each system worked. Each
one required a standing appetite — money, attention, or a process someone had to keep
alive — and appetites get audited eventually. Architecture is what you defend in
review; metabolism is what kills you six months later, quietly, on a day nobody was
thinking about the system at all.

> **Design standing systems so their resting metabolism is about zero.**

Four shapes that satisfy it:

- **Ride-along writes.** The primary write path is work that was happening anyway.
  Nothing exists whose only job is to run so that writes can happen.
- **Per-use work, never per-hour.** Agentic effort is billed by the task, not by the
  clock. A system that costs money while nothing is happening is on a timer.
- **Scheduled and skippable.** Maintenance runs on a schedule, is billed per run, and
  **can be skipped without breaking anything.** Skippability is the test — if missing a
  run corrupts state, it is not maintenance, it is a heartbeat.
- **No resident process whose hunger someone must budget for.** The phrase to watch for
  in your own design docs is "we'll just keep a small service running."

### The nerve / mind distinction

Not every resident process violates the law. A watcher with **no model, no tokens, and
no decisions** — a file tailer keeping an offset checkpoint, say — is a resident
*nerve*, not a resident *mind*. Its hunger rounds to zero, so the law is satisfied in
substance even though something is technically always running.

The line is appetite, not uptime. Ask what the process consumes per hour when nothing
is happening. If the answer is "a few megabytes of RAM," it is a nerve. If the answer
includes tokens, an API bill, a GPU, or a human's attention, it is a mind, and it is on
a clock.

## The corollary: trust follows the read-path

The second-generation system's epitaph: it was better and nobody moved to it.

**A new system wins by making the surface people already read better — never by
demanding they migrate to a new one.** Migration is a cost you charge your users on
day one in exchange for benefits you promise on day thirty, and the exchange rate is
terrible. Worse, it makes adoption all-or-nothing: until they move, they get zero, so
the system has no way to earn trust incrementally.

Practically: keep the old read surface, and render into it from the new record. People
keep reading what they already read; it just gets better. Trust transfers gradually
because it is allowed to. When you eventually want to retire the old surface, you will
have evidence rather than an argument.

Two guards that make this honest rather than a slogan:

- **Ship a parity gate.** Before the new system is treated as the source of anything,
  prove its rendering matches the hand-maintained version. Until that gate is green,
  the old files are still authoritative and are still hand-maintained.
- **Say which files are generated, in the files.** A projected file that does not
  announce itself gets hand-edited, and hand-editing a projection is writing on a
  cache. Banner and timestamp at the top; facts change at the record.

## The satellite pattern (the two-plane contract)

The natural shape once several standing services must know about each other. Each
service is a **satellite**:

1. **Its own stack.** Fault-isolated — no satellite can take another down.
2. **Its own append-only archive.** The satellite's sovereign record, on its own disk.
3. **The two-plane contract**, which is the actual idea:
   - **Live plane** — best-effort direct pokes, for *latency only*. One service
     notifying another is a courtesy wake-up, never a delivery guarantee.
   - **Durable plane** — the archives are the authority. Anyone who needs another
     satellite's history **tails its archive.**

**No message bus.** A bus is resident infrastructure with an appetite, and the
metabolism law eats it. **The archives are the bus.** A lost live poke costs latency,
never truth.

### Why this shape and not the obvious one

Three properties fall out of append-only-plus-offsets, and they are the reason to
prefer this over a queue:

- **Catch-up is free.** An outage costs latency, not data. A consumer that was down for
  six hours reads from its last offset and is current again. Nothing had to be retained
  on its behalf, because nothing was ever deleted.
- **Lag is a health signal.** Expose per-archive freshness — last imported offset and
  timestamp — on a health endpoint. "The glue is behind" becomes queryable instead of
  silent, which is the failure mode that otherwise takes weeks to notice.
- **A reconcile sweep audits the watcher.** Watchers miss events; this is not a bug you
  can eliminate. So pair the fast watcher with a slow periodic sweep that re-derives
  from the archive and reports drift. Liveness and verification as a matched pair, not
  a single mechanism trusted twice.

### Pull, never push

**Satellites never push and never know who is reading them.** The consumer pulls. This
is what makes each sphere self-sovereign: any part can be worked on, restarted, or
rewritten and the others keep moving. A satellite that must know its consumers has a
dependency it did not agree to.

The same rule applied to integration: **integration is not coupling.** When a
long-running service is asked to feed a central system, the shape is a tail-importer
reading its archive — not a database dependency added to the service. The room stays up
when the brain restarts. If your integration would make service A fail because system B
is down, you built coupling and called it integration.

## Evolve, don't sibling

**No new store, ever — evolve the one you have.**

Every new store is added because it is easier than changing the existing one, and every
one of them makes *add-never-retire* structural: now there are N places a fact could
live, N sync paths, and no place where deleting something is obviously safe. The
migration you avoided by adding a sibling is smaller than the permanent tax you just
took on.

The rule has a build-phase form worth stating separately: **any phase may split at
build time; none may merge.** Splitting is reversible and merging is not, so splitting
is a cheap local call and merging is a decision that needs an owner.

## The design review, in five questions

1. **What does this consume per hour when nothing is happening?** Tokens, dollars,
   attention, or a process someone maintains? Anything above "a little RAM" is a clock.
2. **Who has to feed it, and what happens the month they stop?**
3. **Can a maintenance run be skipped with no consequence?** If not, it is a heartbeat
   wearing a schedule's clothes.
4. **Does adoption require anyone to change what they read?** If yes, redesign to render
   into the surface they already read.
5. **Is this a new store?** If yes, say out loud why the existing one could not evolve —
   and expect that answer to be "it was easier."

## Related

- [grindability](../grindability/SKILL.md) — the runtime-cost question at green-light
  time; this is the same question asked of a system that never ends.
- [three-hazards](../three-hazards/SKILL.md) — the human-side metabolism: attention is
  the resource that does not scale.
- [oracle-craft](../oracle-craft/SKILL.md) — the parity gate and the reconcile sweep
  are oracles, and they need the same care as any other.
- [own-the-seam](../own-the-seam/SKILL.md) — a two-plane contract is a seam; name who
  owns it.
