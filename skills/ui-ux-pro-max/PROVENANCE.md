Vendored 2026-07-07 from https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
(commit 12b486b, MIT — LICENSE included). Copied verbatim from the repo's
.claude/skills/ui-ux-pro-max/ (SKILL.md + data CSVs + scripts/search.py).
Self-contained: the search script needs only Python 3 stdlib. Refresh = re-clone
and re-copy; local modifications should be noted here.

Known upstream quirks (vendored verbatim, not fixed locally): SKILL.md lists a
`prompt` domain the search script rejects, and core.py maps six stacks (javafx,
wpf, winui, avalonia, uno, uwp) to CSVs the upstream repo doesn't ship. Command
examples assume the skill directory as cwd.
