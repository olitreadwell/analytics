# plausible/analytics context
> refreshed 2026-09-03 | upstream default: master @ c70260e946e8f7c7506c991a32999b6b8995c3e5

## Identity & policies
- upstream: plausible/analytics, default branch `master`, primary language Elixir (Phoenix) + React/JS frontend.
- English-first: yes (US English dialect — README/CHANGELOG/CODE_OF_CONDUCT use color/behavior/organize).
- CLA/DCO: none found in CONTRIBUTING or .github.
- AI-assisted PR policy: unstated (no ban, no disclosure requirement).
- signed commits required: no.
- PR template: `.github/PULL_REQUEST_TEMPLATE.md` (Changes / Tests / Changelog / Documentation / Dark mode checkboxes).
- external tracker: GitHub issues. CONTRIBUTING: new features must be discussed in Discussions first; PRs without an issue/discussion may still merge but focus goes to discussed changes.

## Conventions (verified from merged PRs)
- branch naming: kebab-case, dominant `fix-...` / `update-...` / `change-...` / `add-...` prefixes (e.g. `fix-e2e-tz`, `fix-500-typo`, `update-elixir`); some owner-prefixed (`sanne-...`). No `type/` slash pattern.
- commit style: plain imperative, no Conventional Commits requirement.
- test command: `mix test` (Elixir); e2e via Playwright (`e2e/`). Lint: `mix credo`, `mix format`, `pre-commit` (codespell configured — `.codespellignore`).
- CI: GitHub Actions; substantive checks are Elixir test + lint + build.
- how outside PRs get merged: responsive; ~93 external merges in 60d; small doc/typo PRs from outsiders do merge (e.g. `fix-500-typo`).

## Maintainer picture
- Core team (Plausible Analytics) active; daily pushes. External contributors merge regularly.

## Issue-area health
- Not the focus of this trivial pass. Stats API issues #6500 (HTTP 500 on non-integer page param), #6260 (visitor counts with event:page filter) are real scoped bugs for a future non-trivial pass.

## Gap ledger (dedupe — READ FIRST, never re-pick)
- `2026-09-03` trivial/minor-fix pass (typos/dead links/stale commands) — outcome: see tried-repos.jsonl.

## Mined gaps (discovered, not yet attempted)
- none yet for this pass.
