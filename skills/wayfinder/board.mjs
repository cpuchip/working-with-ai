#!/usr/bin/env node
/* board.mjs — render a wayfinder map's board from ticket frontmatter.
 *
 * Tickets never move; state lives in frontmatter. A path is an identity, and
 * identities that change break every link that carried them ("anchor to a
 * relation, never a value"). This tool gives the kanban VIEW over files that
 * stay put.
 *
 *   node board.mjs <map-dir>          # <map-dir>/map.md + <map-dir>/tickets/*.md
 *
 * Ticket frontmatter:
 *   title:      <name — referred to by name, never bare number>
 *   type:       grilling | research | prototype | task
 *   status:     open | done | out-of-scope
 *   blocked_by: [NNN-slug, ...]      # ticket file basenames, no extension
 *   claimed_by: <who>                # empty/absent = unclaimed
 *
 * Detector rules honored: zero tickets is a loud statement, not a clean exit;
 * invariant violations exit 1; exceptions print on CLEAN runs too.
 */
import fs from "node:fs";
import path from "node:path";

const dir = process.argv[2];
if (!dir || !fs.existsSync(dir)) {
  console.error("usage: node board.mjs <map-dir>   (needs map.md + tickets/)");
  process.exit(2);
}
const ticketsDir = path.join(dir, "tickets");
const mapPath = path.join(dir, "map.md");

function frontmatter(file) {
  const src = fs.readFileSync(file, "utf8");
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const fm = {};
  if (m)
    for (const line of m[1].split(/\r?\n/)) {
      const kv = line.match(/^(\w+):\s*(.*)$/);
      if (!kv) continue;
      let v = kv[2].trim();
      if (v.startsWith("[")) v = v.slice(1, -1).split(",").map((s) => s.trim()).filter(Boolean);
      fm[kv[1]] = v;
    }
  fm._body = src.replace(/^---[\s\S]*?---/, "").trim();
  return fm;
}

const problems = [];
const tickets = new Map(); // id (basename, no ext) -> fm
if (fs.existsSync(ticketsDir))
  for (const f of fs.readdirSync(ticketsDir).filter((f) => f.endsWith(".md")).sort()) {
    const id = f.replace(/\.md$/, "");
    const fm = frontmatter(path.join(ticketsDir, f));
    if (!fm.title) problems.push(`${id}: no title`);
    if (!["grilling", "research", "prototype", "task"].includes(fm.type))
      problems.push(`${id}: unknown type "${fm.type}"`);
    if (!["open", "done", "out-of-scope"].includes(fm.status))
      problems.push(`${id}: unknown status "${fm.status}"`);
    tickets.set(id, fm);
  }

// referential integrity: blocked_by must name real tickets
for (const [id, t] of tickets)
  for (const b of Array.isArray(t.blocked_by) ? t.blocked_by : [])
    if (!tickets.has(b)) problems.push(`${id}: blocked_by "${b}" does not exist`);

// done tickets must carry a resolution (the answer lives ON the ticket)
for (const [id, t] of tickets)
  if (t.status === "done" && !/##\s*Resolution/i.test(t._body))
    problems.push(`${id}: done without a "## Resolution" section — a closed question with no answer`);

const open = [...tickets].filter(([, t]) => t.status === "open");
const done = [...tickets].filter(([, t]) => t.status === "done");
const oos = [...tickets].filter(([, t]) => t.status === "out-of-scope");
const isBlocked = ([, t]) =>
  (Array.isArray(t.blocked_by) ? t.blocked_by : []).some((b) => tickets.get(b)?.status === "open");
const frontier = open.filter((e) => !isBlocked(e) && !e[1].claimed_by);
const claimed = open.filter((e) => e[1].claimed_by);
const blocked = open.filter((e) => isBlocked(e) && !e[1].claimed_by);

// destination + fog straight from the map (the map is the index)
let destination = "(no map.md)", fog = [];
if (fs.existsSync(mapPath)) {
  const map = fs.readFileSync(mapPath, "utf8");
  destination = (map.match(/##\s*Destination\s*\r?\n+([^\n#]+)/) || [, "(none stated)"])[1].trim();
  const fogSec = map.match(/##\s*Not yet specified\s*\r?\n([\s\S]*?)(\r?\n##|$)/);
  if (fogSec) fog = fogSec[1].split(/\r?\n/).map((l) => l.trim()).filter((l) => l.startsWith("-"));
}

const line = (id, t) =>
  `  ${t.type.padEnd(9)} ${t.title}  (${id}${t.claimed_by ? ` · claimed: ${t.claimed_by}` : ""})`;

console.log(`DESTINATION  ${destination}\n`);
console.log(`FRONTIER — decidable now (${frontier.length})`);
frontier.forEach(([id, t]) => console.log(line(id, t)));
if (!frontier.length && open.length) console.log("  (none — everything open is blocked or claimed)");
if (claimed.length) {
  console.log(`\nCLAIMED (${claimed.length})`);
  claimed.forEach(([id, t]) => console.log(line(id, t)));
}
if (blocked.length) {
  console.log(`\nBLOCKED (${blocked.length})`);
  blocked.forEach(([id, t]) =>
    console.log(`${line(id, t)}\n            waits on: ${(t.blocked_by || []).filter((b) => tickets.get(b)?.status === "open").join(", ")}`),
  );
}
console.log(`\nFOG — not yet specified (${fog.length})`);
fog.forEach((f) => console.log(`  ${f}`));
console.log(`\nDONE ${done.length} · OUT OF SCOPE ${oos.length} · TOTAL ${tickets.size}`);

// zero-inspected is a statement, never silence
if (tickets.size === 0) console.log("\n⚠ ZERO TICKETS — either the map is freshly charted or this is the wrong directory. Not a pass.");
// no-fog-no-frontier on an open map is the done signal, said out loud
if (tickets.size > 0 && !open.length && !fog.length)
  console.log("\n★ NOTHING LEFT TO DECIDE — the map is complete. Compile it (map → spec → build machinery).");

if (problems.length) {
  console.log(`\nINVARIANT VIOLATIONS (${problems.length})`);
  problems.forEach((p) => console.log(`  ✗ ${p}`));
  process.exit(1);
}
console.log("\ninvariants: clean");
