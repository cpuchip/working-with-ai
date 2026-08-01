---
name: own-the-seam
description: When work splits across spheres — agents, teams, services, layers — every sphere verifies its own half honestly and nobody verifies across. The seam between two spheres belongs to nobody by construction, so name its owner out loud at the split. Load when dividing work among agents or people, when reviewing a "both ends are working" report, and when diagnosing a defect where every gate is green and the feature still does not work.
---

# Own the Seam

## The law

**The seam between two spheres belongs to nobody by construction.** Not by neglect —
by construction. Everyone verifies *inward*, toward their own boundary, which is exactly
what good stewardship looks like from inside a sphere. No instrument points at the gap,
and no amount of diligence inside a sphere covers it.

The corollary is the one that catches coordinators:

> **Checking both ends is not checking the join.** Two true facts about two files say
> nothing about whether anything connects them.

## The worked example

One night's build, eight agents, a morning deadline. The one feature the deliverable
could not ship without — the never-cut item — could not fire on any build that existed,
for hours.

- The simulation computed the triggering condition correctly. Verified.
- The client rendered correctly when handed the message. Proven red-then-green.
- **Nothing in between ever emitted it.** A grep for the message name across the server
  package returned nothing at all.

Four agents had reported the feature working, *each correct about their own half.* Every
gate stayed green. And the coordinator — who had personally read the sim's predicate and
personally read the client's render call, and therefore reported the middle as proven —
was the one structurally placed to catch it, and didn't.

## The tell

**Two reciprocal one-field items pointing at each other.** Sphere A's list says "B sends
us X." Sphere B's list says "A consumes X." Both are locally right, both seats wait
politely, and neither moves. Any time a hand-off is described from both sides and never
as an *act*, go looking for the sender.

The blunt version of that question: **ask "who sends it?"** — not "is it computed?" and
"is it rendered?"

## How to apply

1. **Name the seam owner out loud when work splits.** Not "you do A, you do B" —
   *"...and the join is mine."* An unnamed seam is an unowned seam, and the coordinator
   is the default owner whether or not they said so.
2. **Test the join, not the ends.** The test that catches this drives end to end through
   the real path and fails in *both* directions: it fires when the condition is earned,
   and it does not fire when the condition is absent. A test that only proves the happy
   direction cannot tell a working join from a constant.
3. **Put an integration checkpoint early and deliberately thin** — one verb, one view,
   both real sides, before either sphere is complete. See
   [cut-order](../cut-order/SKILL.md); the thin checkpoint is what makes the seam
   observable while there is still time to fix it.
4. **Treat a capability with no call site as absent.** A routed sound nothing plays, an
   allowlist nothing exercises, a component in a stylesheet no page loads: **a wall proves
   what may not happen and says nothing about what does.**

## Layers are seams too

An empty surface has a cause in *some* layer, and each specialist reaches first for their
own: the designer for hierarchy, the engineer for the query, the operator for the cache.
Reaching for your own lever is fast and feels like expertise.

> **Establish which layer is actually empty before ruling in the layer you can change.**

A user said they could not tell whether a control was having any effect. The designer
owned the type scale, diagnosed a *hierarchy* problem, and ruled a *styling* fix: promote
the demoted number. Two measurements later, both halves of the ruling were wrong. The
number promoted **could not exist** in the case the complaint came from — it was only
transmitted under a condition that never held in that session, and a capture found the
field blank in 77 of 77 samples across a 26-second run. Promotion is styling; the gate is
transmission. The cheap discriminator: **ask whether the value exists before asking how it
is presented.** One grep of the transmit path would have killed the ruling before it was
written.

**The boundary cuts both ways, and the second direction is worse.**

- **Over-attributing to your own layer** at least leaves a wrong claim someone can refute.
- **Clearing your layer and calling the system clean leaves nothing to refute.** The report
  reads as a check that was performed, and the finding dies quietly.

So: *a hypothesis disproved in your layer is not disproved.* Checking your own layer first
is efficient; treating its verdict as the system's is the same error inverted. **State the
scope of every all-clear.** "Not in the styling layer" is a finding. "Not a problem" is a
seam breach.

Two corollaries paid for in the same hour:

- **When two causes are found, the second does not evict the first.** They are additive,
  not competing — and preferring your own cause is the tell.
- **Verify before escalating, especially about your own component.** A wrong escalation
  about the thing you designed spends the credibility you need for the right one.

## Related

- [fan-out](../fan-out/SKILL.md) — no instrument points at its author's blind spot; why a
  second witness has to *stand somewhere else*.
- [verification-chain](../verification-chain/SKILL.md) — the same family from the other
  side: a claim degrading as it passes between people, rather than the gap no claim covers.
- [cut-order](../cut-order/SKILL.md) — the early thin integration checkpoint.
- [foreman](../foreman/SKILL.md) — dispatch; this skill is what dispatch leaves behind.
