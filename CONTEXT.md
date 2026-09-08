# plausible/analytics context
> refreshed 2026-09-09 | upstream default: master @ ac320452c07a765d5b76255ca08b7e30f985d67f

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
- CI: GitHub Actions; substantive checks are Elixir test + lint + build. Frontend: `npm test` (jest), `npm run eslint`, `npm run typecheck` in `assets/`.
- how outside PRs get merged: responsive; ~93 external merges in 60d; small doc/typo PRs from outsiders do merge (e.g. `fix-500-typo`).

## Maintainer picture
- Core team (Plausible Analytics) active; daily pushes. External contributors merge regularly.

## Issue-area health
- Stats API issues #6500 (HTTP 500 on non-integer page param), #6260 (visitor counts with event:page filter) are real scoped bugs for a future non-trivial pass.
- #6500 is CLAIMED by open PR #6501 (approved by ukutaht, not merged) — do NOT re-pick.

## Gap ledger (dedupe — READ FIRST, never re-pick)
- `2026-09-03` trivial/minor-fix pass (typos/dead links/stale commands) — outcome: see tried-repos.jsonl.
- `2026-09-09` self-found frontend gap: `assets/js/dashboard/util/goals.ts` `isPageViewGoal/1` is missing its `return` (always returns `undefined`). Introduced 2026-01-07 (#5985), usage removed by #6440 so currently dead code. Fix + unit test. Dedupe: no upstream issue/PR for this. — outcome: pr-opened (see tried-repos.jsonl).

## Mined gaps (discovered, not yet attempted)
- `2026-09-09` backend `Plausible.Pagination.to_int/1` (`lib/plausible/pagination.ex`) raises `ArgumentError` on a non-integer `limit` string. NOT reachable via the Plugins API: `OpenApiSpex.Plug.CastAndValidate` (declared `limit: type: :integer`) rejects non-integer with 400 before the action runs. Only consumers are Plugins API controllers. — status: dropped (not reachable via public API).
