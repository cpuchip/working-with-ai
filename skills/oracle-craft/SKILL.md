---
name: oracle-craft
description: The detector's own design rules — how to build a check, gate, lint, test, or health probe so that it can actually fail, and how to read the green it gives you. Use when writing any oracle, when a check you built is about to be cited as evidence, when a gate went green over a real defect, or when deciding what to do about a rule no oracle can cover. Companion to grindability (whether to grind) and study-it-out (whether you looked).
---

# oracle-craft

> "A false balance is abomination to the Lord: but a just weight is his delight." — [Proverbs 11:1](https://www.churchofjesuschrist.org/study/scriptures/ot/prov/11?lang=eng)

[grindability](../grindability/SKILL.md) decides *whether* to grind. [study-it-out](../study-it-out/SKILL.md) decides *whether you looked*. This skill is about the instrument itself.

Every law below was paid for by a check that was green while the thing it watched was broken. Most of them came out of one multi-agent build night, where the house discipline was already "read the artifact, not the claim" and three wrong beliefs still reached the room. Nobody in any of those chains was careless. That is the point: a careful person with a bad instrument produces confident, specific, wrong answers, and produces them faster than a careless one.

---

## The one test

> **An instrument that supplies the value it is asked to check will always agree with you.**

Not "instruments can be wrong." This failure is silent, self-consistent, and produces confident green forever. Three separate spheres hit it in a single evening, in three languages, and **each found it in their own work only after someone else's unrelated finding pointed at it**:

- A verification method that read **computed style**. The browser resolves a value whether the rule worked or was silently dropped by a parse error upstream. *A rule that never applied and a rule that was never written compute identically.*
- A scenario test that **modelled its own fixture** instead of reading the real one. Green through two real defects: geometry right, timings right, pointing at the wrong object.
- A staleness guard that stored **the server's build as the client's baseline**, then compared the server to itself. A cached old client recorded the fresh build as its own and called itself healthy forever.

**The test — ask what your instrument would report if the thing it checks did not exist at all. If the answer is "the same thing," it is not an oracle. It is a mirror.**

A real check takes its expectation from a *different source* than the thing under test. Ask where the expected value came from: if the instrument computed, modelled, cached, or defaulted it, the instrument is agreeing with itself.

### The alarm-side dual

The mirror has a twin that is more likely to get published, because it feels like diligence.

> **A check that returns the alarming value in both worlds cannot distinguish, and it will always look like a finding.**

Someone escalated that a server had shipped without a safety guard, offering `curl /healthz | grep -c <term> → 0` as the evidence. That endpoint never mentions the term **on any build**. The probe returns `0` on a guarded server too, so its only possible output was a finding.

Before escalating: *what result from this probe would have told me everything was fine?* If there isn't one, it is not evidence. An unfalsifiable green is a mirror; an unfalsifiable red is a mirror that flatters your suspicion.

### And the mechanism underneath all of it

*You cannot inspect your own proposal for the failure mode you are most fluent in — fluency is what makes it invisible.* Every steward that night built instruments aimed at their own known risks, and every instrument was blind in the same direction: toward the sentences its author was most confident about. This is the structural argument for a second pair of eyes, and it is stronger than the fatigue argument.

---

## 1. A detector must bless its own recommended fix

Assert it in a test.

A gate enforcing cross-machine float determinism nearly flagged `math.FMA` — which is correctly rounded by IEEE-754, identical on every platform, and therefore not the hazard at all. A loop-bound gate nearly flagged the fixed-iteration solver that its own clause *recommends*. Both would have been telling people to write the thing they reject.

**Cry wolf once and the gate gets routed around. A switched-off gate is worse than no gate, because everyone believes it is still running.**

The test to write is not "does it catch the bug." It is "does it stay silent on the code I would tell someone to write instead."

### 1b. A directional test blesses the same defect entered from the other end

A steadiness check on a generated signal was written as `first_eighth − last_eighth > 6 dB` — correct for the defect in hand, which was a swell followed by ten seconds of silence. Its very first re-roll walked straight through it:

```
-76  -75  -15.5  -10  -10  -9.9  -9.9  -12.7
```

Four seconds of *leading* silence on an otherwise perfect signal. `first − last` is **negative**, so the gate cheerfully reported everything steady. Same audible defect, same file, opposite end.

The fix is `max − min`. **A directional metric encodes the shape of the bug you already found; a spread metric encodes the property you actually want.** Ask of any threshold: *if I mirrored the input, would this still fire?*

---

## 2. Printed exceptions

A reviewed escape hatch must require a *reason* and must render on **clean** runs, not only failing ones.

An exception nobody can see is how every gate everywhere quietly dies. Printing them turns the exception list into a standing agenda item instead of an archaeology project.

---

## 3. Zero inspected is a FAILURE, not a pass

A symbol-scanning gate's first run matched zero symbols, because the compiler emitted a different name form than the pattern expected. It would have reported a serene clean over a completely unexamined binary.

**Every detector needs "did I actually look at anything?" as a hard error, distinct from "I looked and found nothing."** Print the inspected count, or the inspected list, and fail on zero. The same rule governs exit codes: **couldn't-run must never read as passed.**

(This is why an oracle that reports its own coverage — files scanned, rules walked, cases exercised — is worth the extra ten lines. `../wayfinder/board.mjs` carries a minimal version: on an empty input it prints *"either this is freshly charted or this is the wrong directory. Not a pass."* Note that it says so and still exits 0, which is fine for a report you read and not enough for a gate that something else consumes. If you wire a reporting tool into CI, the exit code has to carry what the text already says.)

### 3b. A wrapper is part of the instrument

A correct gate exiting 1 was read as success because the invocation piped through `tail`, and a shell pipeline reports the **last** command's status, not the check's.

```
check --in /does/not/exist | tail -3 ; echo $?   → 0   ← tail's status
check --in /does/not/exist                       → 1   ✅ always did
${PIPESTATUS[0]}                                 → 1
```

`| tail`, `| head`, `| grep`, `| head -n1` all discard the exit code. Four separate people walked into that one idiom in a single evening. The mechanical fixes are `${PIPESTATUS[0]}`, `set -o pipefail`, or simply not piping the thing whose exit code you need — but the general rule outlives shells: **whenever you wrap a check, confirm the wrapper propagates failure.**

**And the operational half: never report someone else's exit code. Re-run it yourself, direct and unpiped.** Three people published "this tool exits 0 on a real divergence"; a fourth adopted it and wrote it down as a durable rule; it was false, and every one of them had piped through `tail`. A working tool was filed as broken, in permanent memory, inside an hour.

**Test an oracle's exit code before its logic**, with two injections: *couldn't-run* and *ran-and-found-something*.

### 3c. When a lesson lands, sweep BACKWARD

This one reaches past detectors, into everything you have already said.

The seat that published the false exit-code claim above checked *their own new gate's* exit code directly twenty minutes later — **precisely because they had just filed that defect against someone else** — caught a real instance there, reported catching it, and left the earlier published claim standing uncorrected in the room.

> **Catching a class in your new work does not audit the claim you already published. Those are two different acts, and almost everyone only does the first.**

The reflex fires forward and never backward, because the felt sense of *"I am being careful about this exact thing"* is fully satisfied by fixing the new instance. So the backward pass needs its own trigger: **when you catch a class in new work, the next action is to grep your own recent output for that class** — the reports, the memories, the docs, the claims you made in a channel.

There is a second question hiding here, and it turned out to be the better one. The defect in that story had survived on **coverage**, not on a lying instrument: nobody had ever run the checker on a real session. So the question to ask of any suite is not only "what else lies," but **"what else has never been run on the real thing."**

---

## 4. A control's premise is itself a claim, and it can be too simple

A gate was written with a control baked in: *"this baseline cannot fuse, so a violation here means the tool is misreading."* It reported 37 violations. The tool was reading correctly — those were real fused instructions from an explicit intrinsic whose hardware path is compiled in behind a runtime CPU check.

**The control did its job and indicted the wrong suspect.** The only way through was to stop reasoning and read the actual instructions.

This is the rung above "distrust the instrument": *distrust the reasoning that tells you what the instrument's result means.*

---

## 5. Three levels, and the middle one is the one people skip

> ```
> prohibition   proves nothing happens where it shouldn't
> liveness      proves something CAN happen
> neither       proves anything ever DOES
> ```

A prohibition gate is **structurally blind to absence** and will be green forever over a feature that never fires. One such gate proved that a restricted sound never reached the wrong console — and passed, correctly, while that console played no sound at all: the routing *permitted* it, the asset was deployed, and no call site ever used it. It was found by clicking the button and watching the network panel stay empty. The gate could not have found it and never will.

Ask of any deny-gate: *what would a totally silent, empty, dead version of this subsystem score?* If the answer is green, pair it with a liveness check.

But liveness is only rung two. It asserts that a call site **exists**; it cannot assert the call site is ever **reached**. Concretely, in one night: a simulation computed an ending predicate every tick, the client rendered on receipt of that event, and **nothing in between ever emitted it** — so the closing screen could not fire on any build ever made. Four reviewers reported the feature complete, **each correct about their own half**, every gate green.

> **A capability asserted at both ends is not a capability.**

When you verify a feature, name the **join** and test that: drive the real path end to end and observe the output where a user would. "I checked the producer and I checked the consumer" is two checks that both pass while the feature does not exist. (The coordination-side statement of the same law is in [own-the-seam](../own-the-seam/SKILL.md) — checking both ends is not checking the join.)

**The practical trick for rung 3: name the tell.** For each rule, find the one derived value that *cannot* occur unless the rule applied — the value that differs from the default. A rule whose correct effect equals the default has **no tell**, and that is exactly the rule most likely to be lost with nobody noticing. Find those first; they are invisible by construction.

---

## 6. Never put a gate and a commit in the same command

Someone ran `oracles.sh && git commit` on one line. The suite went RED, catching a half-finished rename, which is exactly its job. They read the commit's output line and pushed.

**A green nobody read is worse than no gate. A red nobody read is worse still.**

Run the gate. *Read* the gate. Then commit.

---

## 7. A caveat that lives only in the instrument does not travel with its output

A rehearsal tool's header said plainly that it propagated its marks in a straight line at initial velocity. The numbers it produced crossed into a design doc, then a roadmap, then a routing decision, and after the first hop nothing carried the limitation. A severity ruling ended up built on straight-line marks in a curved regime, published under a banner reading *"every number MEASURED on the real system."*

The author **knew**. The caveat sat two lines below the guarantee, in the one place nobody downstream reads.

> **The limitation goes in the artifact that carries the number.**

Every derived doc, table, or summary restates its instrument's known blind spot next to the figures, or the figures travel naked. And when it does go wrong, separate the halves out loud — *the conclusion stood and the evidence for it didn't* — so nobody inherits the wrong one.

---

## 8. An assertion that can pass without the condition occurring is not a check

Four tests lied in one night, and every lie had the same shape: the assertion could not fail for the reason it claimed to test.

- A suite asserted **no member name started with a given prefix**. It passed green while the very thing it hunted sat in the room under the bare name. The condition never occurred.
- An assertion hardcoded **an expected count** and went red while the fix under test was working, because the number had been counted in someone's head and forgot a legitimate case.
- An assertion ran over **state the test did not control**. An unrelated participant disconnecting mid-run produced a confident failure with no defect behind it.
- A peak detector reported the same direction three times because its separation comparison was backwards. It would have shipped looking fine, **because numbers appeared.**

The four rules that fall out:

1. **Measure a delta, not a number you counted yourself.** Capture before, act, compare. A hardcoded expected count encodes your arithmetic, and your arithmetic is the thing under test.
2. **Assert only over state you control.** Anything else fails for reasons that are not defects, and a check that cries wolf gets ignored, which is worse than no check.
3. **A test must never be able to damage what it observes.** One suite was silently evicting live sessions because its fixtures used the same identifiers real ones did. Namespace test fixtures away from real ones.
4. **Prove the oracle can fail before trusting it green.** Remove the mechanism, confirm red, restore it, confirm green. Cheap, and it is the only thing separating a check from a decoration.

Numbers appearing is not evidence.

---

## 9. Anchor a check to a relation or a digest, never to a value

Four checks in one session were anchored to a *specific value*, and all four rotted the same way:

| anchored to | how it rotted | what replaced it |
|---|---|---|
| **pixels** — a fixed type scale | held at exactly one viewport width | a floor *relative to another element* |
| **a path** — a directory name in notes | the directory moved twice in one evening | a query that asks the running system where it is |
| **a token name** — grep for a string to prove a client is current | rename the token and a *current* build greps as stale | a **digest** of the whole served tree, compared as one string |
| **a flag's absence** — no `-seed` on a command line | its default was `42`, so absence meant nothing | ask the running thing: a matching genesis hash |

> **A value-anchored check inherits every future rename, move, and default.** Anchor to a *relation* (this must not be smaller than that) or to a *digest* (these two trees agree), and it survives changes nobody told you about.

**The nastiest failure direction is the false alarm**, which is why this is not merely tidiness. A stale value-anchored probe reports *the alarming answer about a healthy system*, it looks like diligence, and it gets published. Renaming a token does not break the check loudly; it makes the check accuse a correct build.

---

## 10. A guard that doesn't guard leaves no trace

The family this whole file catalogues is *checks that don't check*. This is its sibling and it is harder to see: **defensive code that works perfectly, whose effect is silently cancelled by something that looks unrelated.** Three sightings, one night, three spheres:

- A status chip seeded to a friendly default on an object with no state to read. The update guard **correctly** detects the absent field and **correctly** declines to overwrite, so the placeholder survives forever, in canonical vocabulary, on a live console.
- A router's `teardown()` **correctly** closes the socket it holds — but a racing call had already replaced the reference, so the orphan stayed open and held a seat nobody was in.
- A view's `idle.hidden = true` fires on **exactly** the right frame and does nothing, because a `display: grid` rule defeats the user agent's `[hidden] { display: none }`. A title card sat on top of the running app, permanently.

No error. No exception. No wrong type. Every gate green in all three cases.

> **The code that prevents a wrong state is invisible when it fails, because success and failure look identical from inside it. You cannot read a guard and learn whether it guarded. You can only measure the outcome.**

And measuring the outcome is not sufficient on its own, which is what rung 2 of law 5 is for: every check that reads a **derived** value — computed style, an effective config, a resolved permission, a materialised view — reads the same thing whether the source rule worked or vanished. **The default is indistinguishable from the correct answer whenever the correct answer is the default.**

---

## 11. Absorbed is not dead

A perturbed build produced a byte-identical state hash. By the usual rule — *identical output across a changed input means the knob isn't wired* — that is a dead knob, and it was one step from a hunt for a wiring bug that did not exist. Measuring the **intermediate** instead of the output settled it in one probe:

```
perturbation  0                 → 1.776e-15          the knob IS wired
input value   7.199999999999999 → 7.200000000000001  it DOES change
state hash    bca8bb74…         → bca8bb74…          absorbed
```

The change was real and landed below the last representable digit of the much larger value it fed into, so the sum came back bit-for-bit unchanged.

**So identical output has two causes needing opposite responses.** A dead knob is a bug to fix. An absorbed one is a fact about **dynamic range**: the same knob bites hard somewhere else, and the system's sensitivity is a property of *where it happens to be*, not of the code. Tell them apart by probing the value nearest the knob. If that moved, something downstream swallowed it.

**The consequence that generalises past the bug:** if sensitivity depends on system state, then *N recorded sessions are not N× coverage.* Each is exact as "did this reproduce" and variable as "would a future change break this." A shelf of green recordings is precisely the kind of evidence that **looks** like coverage. Those are witnesses, not detectors. Keep a real sensitivity oracle separately.

---

## 12. One branch, two meanings

A detector shape, not an anecdote — which means it can be linted rather than remembered.

**The shape:** an expression with two branches serving a reality with three or more states.

| site | the reality | the expression |
|---|---|---|
| `omitempty` on a float or bool | absent · zero · live | two |
| an `isFinite()` liveness test | absent · zero · live | two |
| a button's why-line | on-target · ready · not-**yet** · not-**ever** | two |
| one CSS `[disabled]` rule | "not right now" · "not in this story" | two |

**Why it is dangerous rather than merely untidy: the unrepresented state does not render as nothing. It renders as the wrong one of the two, with full confidence.** A guard that made a control categorically unavailable displayed *"no solution **yet**"* — and *yet* is a promise. The interface was inviting the user to keep working toward something that would never be granted. Silence would have been better than the fallback.

**The discriminator is not the obvious one.** Not *"where is a zero"* — that sweep finds only the first row. It is **where does a boolean stand in for a state space larger than two.** That is a *syntactic* shape, which is what makes it a real lint rather than a review-discipline entry.

Applying it:

- When adding a guard to an existing predicate, immediately ask **what the surface now collapses.** A new refusal reason almost always lands inside an old boolean.
- **Widen the type before you rewrite the label.** Fixing it with a better string alone fails in the opposite direction, because the code still cannot tell the two apart; it will just be wrong the other way.
- **Derive the flag and its reason from ONE function.** A separate why-computation beside the predicate re-creates the exact hazard the fix removed: two things that agree today. `solutionState() (bool, string)` makes the state and the explanation the same decision, read twice.
- **The `omitempty`-vs-pointer discriminator is sharp, not a judgement call.** `omitempty` is correct only when the zero value is *impossible* for real data, and wrong whenever zero is a reading a user can actually get. In one file: a period of `0` meaning an unbound orbit → `omitempty` right; a drift of `0.0` meaning a parked object → pointer required; a throttle of `0.0` meaning engine off → leave it alone entirely.
- **A rule you only apply to the type that taught it to you is not a rule yet.** The seat that shipped this three times already had `hasText()` at the top of the same file, written by them, because *"an empty string is an absence wearing a value's shape."* A zero is the same animal in a numeric coat.
- **Boolean names on a three-state ladder are the same defect in vocabulary.** One fix for a cardinality bug spelled its own new three-state ladder as `true` / `false` / plus a third named token — so the fix lied about its own cardinality in the token names. Name all three states for what they are, or the next reader will treat two of them as a boolean again.

---

## 13. Measure the regime your ruling covers

A telemetry readout was measured on the wire at rest: **138,797 seconds — 38.6 hours to a mark 20 km away.** True, reproduced, on the real path. The draft ruling was: *this readout does not return; the formula is wrong for this system.*

Then it was measured again mid-burn, and only because the author was about to dispute a peer and did not want to hand them a wrong number:

| burn | reading |
|---|---|
| 3 s | 1564 |
| 9 s | 511 |
| 26 s | 165 |

It halves in six seconds while the range readout moves 100 metres. The readout was not the casualty. It was the single most responsive quantity the system published, and it answered the user's actual complaint in their own words. The ruling would have deleted the fix.

The 38.6-hour reading was not wrong. It was **idle-regime**, and the ruling it justified was about the **burn regime**, which had never been sampled.

> **Killing something needs a stronger sample than keeping it.** A keep-ruling gets corrected by the next person who uses the thing. A kill-ruling removes the evidence that would have corrected it.

And the regime you happen to measure first is usually the idle one, because idle is what a system is doing when you attach the instrument. **Sample the state you are ruling about, not the state the system was in when you looked.**

**The sharper form of the same error: sampling a regime that does not exist.** One probe demonstrated a bug with a pair of values the system *cannot emit*, because the threshold that sets one of them forces the other. Right conclusion, fictional case. Before a probe proves anything, ask whether the state you constructed is reachable — and note why it matters: **the right fix for the wrong reason gets reverted.** The next person verifies the case you named, gets a green, and pulls the fix back out. So write the durable reason into the test, not just into the commit message.

---

## 14. Keep an unenforced-invariant register

The standing rule is *widen autonomy by widening the verification floor, not by trusting harder.* What that leaves missing is an inventory of **where the floor has holes.**

**The move:** in any project with real oracles, keep **one** explicit list of the rules held by review discipline alone. Not scattered across whichever document introduced each one. One place.

**Why it is a different object and not just a weaker rule:** an oracled rule fails loudly and immediately. An unenforced invariant *erodes*, one reasonable-looking exception at a time, and the first symptom shows up far downstream where nobody connects it back. Filed among enforced rules it looks equally safe, which is precisely the disguise.

Three things the list buys:

1. **"Get one off the register" becomes a defined, celebratable act.** Attack the entries rather than remembering them harder. Ask of each: **is the violation syntactic?** If it is, a parser-level lint gets high recall cheaply, and its false positives are exactly the cases that deserve a human look.
2. **What genuinely cannot be automated gets a PERSON assigned, not a hope.** Naming something unmechanizable is the useful half; it stops hiding among the automated.
3. It surfaces rules that were never really being kept at all.

### 14b. A deferral is an unenforced invariant with a timestamp — make it watch its own expiry

Someone found a hole in their own health marker: it reported *where* a client was served from and never *what was there*, so deleting the directory left it answering healthy while every page 404'd. They logged it deliberately as a **decision, not an oversight** — shipping the fix would have put a live server behind HEAD with nobody holding the rebuild ritual, and *a documented gap beats a stale server* was the right call at the time.

Then the exact scenario it was deferred against happened. The live server sat six commits behind, serving a stale client, with the marker reading clean. **The deferral's premise had expired hours earlier and nobody was watching the premise** — including the person who wrote it down.

So when you defer, write the **condition** that makes the deferral valid, not only the reason. Then give it a watcher or a check that fires when it expires. *"We'll do it later, because X"* silently becomes *"we never did it"* the moment X stops being true, and X stopping is exactly the event nobody is looking for.

**And the answer, which is stronger than anything else proposed:** a temporary duplicated constant got a gate that does two things, and the second is the one worth stealing.

1. It compares the two copies **as numbers**, so `12e3` and `12000` are one seam rather than a notation failure (law 9, applied to the comparison itself).
2. **Each seam names the field whose *arrival* retires it — and that field's arrival is a FAILURE.**

So the check fires when the duplicate becomes *unnecessary*, not only when it drifts. The usual shape ("assert the temporary measure is gone") only catches removal you already remembered to do. This one notices the moment the reason expires.

One level up, the same idea: **an oracle whose claim depends on a document should read that document and report when its premise goes stale.** A test asserting *"completed using only the on-screen instructions"* now reads the instructions and says out loud when they no longer name the cue the test actually uses.

---

## 15. An ambiguous fact needs an unambiguous response

A checklist item had a genuinely three-valued input: a health field could say *current*, *stale*, or be **absent**, where absent meant "older binary," which is not a failure. The obvious fix is to explain the third case. The better one:

> **Give the ambiguous readings the same action.** Current → go. Stale → rebuild first. Absent → rebuild first. **An ambiguous fact with an unambiguous response is the only kind that survives being read once, in a hurry.**

Explanation is a cost paid by whoever reads the checklist, at the worst moment, when they are tired and pleased and want to start. Collapsing two readings onto one action removes the interpretation step entirely — and it does so *without lying about the ambiguity*, which is what separates it from papering over the problem.

It is the same rule reached from the other end when writing interface copy: **name what IS, never what the user failed to be.** MATCHING, not "not matched." STOWED, not "no solution yet." A state whose meaning requires the reader to reason fails on the least-experienced person at the table.

**The checklist rule and the interface rule are one rule: the surface does the interpreting, or the person does — and the person is holding a controller.** Cousin of law 2: a fact nobody can act on without reasoning is a fact that gets skipped.

---

## 16. Hedge the reassurance harder than the warning

Someone wrote a risk note with a careful boundary on the hazard: *"I observed that implementations differ by architecture and that the spec permits divergence. I have NOT demonstrated two differing results."* Two sentences earlier, from the exact same weak instrument, they had written flatly: *"Trig is clean, so the analytic path is safer than it first looks."*

Measurement refuted **the reassurance**, not the warning. The cleared thing was the actual hazard.

> **A warning invites verification. A reassurance ends it.**

A wrong warning costs a spike. A wrong all-clear is the sentence that removes an item from the list of things anyone will ever check. So an unhedged reassurance is strictly more expensive than an unhedged warning — and we are all reliably more careful with the warning, because *it* feels like the risky claim.

**How to apply:** in any report, review, or risk note, find every sentence that tells the reader something is FINE and hold it to the higher evidentiary bar. Ask of each: *what instrument told me this is safe, and does that instrument actually observe the thing it is clearing?* "X is clean" from a structural proxy is not a finding. If the hazard claim is worth hedging, the all-clear is worth hedging twice.

The same asymmetry, stated for the whole report: **find the claims carrying no measurement, and check those first.** Fluent inference is cheap and feels finished. (The practice-what-you-preach version of this check is [ben-test](../ben-test/SKILL.md).)

---

## The close: agreement is not inheritance

> **You cannot inherit a lesson by agreeing with it. It only transfers when it becomes a check.**

Someone published a real finding: the CSS `ch` unit resolves against the element's *own* font size, so a measure written on a small-type container clamps to nothing. Another steward read it, agreed with it, said so out loud in the room — and shipped the identical defect an hour later, because their instrument was green and agreement lives somewhere verification doesn't.

> **Agreement runs at read-time. Verification runs at 4am.**

The companion, from the seat that published the finding: they had recorded that lesson in a commit message and a code comment. *The lesson about instruments, written in the one form no instrument can enforce.*

So when a lesson lands that you intend to keep, the question is not "do I agree with this" but:

> **"What check now fails if I forget this?"**

If the answer is none, it has not transferred yet. It is on the register (law 14), with a person's name on it, exactly like every other unenforced invariant.

**Which applies to this file.** Reading it changes nothing. Every law here was written down somewhere by someone who then broke it, usually within the week, usually while being careful. Pick the two or three that match what you are building and turn them into assertions today; leave the rest on the register and know that they are there.

---

## Relation

- [grindability](../grindability/SKILL.md) — the green-light triage: *what's the oracle* and *is it grindable*. That skill decides whether to build one; this one is how to build it well.
- [study-it-out](../study-it-out/SKILL.md) — ground the judgment in the artifact, and name *which version* of the artifact.
- [own-the-seam](../own-the-seam/SKILL.md) — law 5's join, from the coordination side.
- [verification-chain](../verification-chain/SKILL.md) — the six ways "read the artifact" still fails.
- [mistake-recovery](../mistake-recovery/SKILL.md) — where the backward sweep of law 3c belongs once something has already shipped.
- [human-in-the-loop](../human-in-the-loop/SKILL.md) — absence of an oracle pushes a borderline call toward surfacing rather than acting.
