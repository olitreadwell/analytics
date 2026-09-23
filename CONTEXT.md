# plausible/analytics context
> refreshed 2026-09-23 | upstream default: master @ e38de9fe107de19dfdffb43347c3ad8e2ed5f57a

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
- `2026-09-09` self-found frontend gap: `assets/js/dashboard/util/goals.ts` `isPageViewGoal/1` is missing its `return` (always returns `undefined`). Introduced 2026-01-07 (#5985), usage removed by #6440 so currently dead code. Fix + unit test. Dedupe: no upstream issue/PR for this. — outcome: dropped (function is dead code — not referenced anywhere in committed master; prior run left an uncommitted fix+test, no PR was opened).
- `2026-09-09` self-found test-coverage gap: `assets/js/dashboard/util/number-formatter.ts` exports `durationFormatter`, `roundedNumberFormatter`, `percentageFormatter`, `nullable` (all used in production via `stats/reports/metric-formatter.ts`) but had no direct unit tests. Added 14 tests to `number-formatter.test.ts`. Verified: `npx jest js/dashboard/util/number-formatter.test.ts` PASS, `tsc --noEmit` PASS, `eslint` PASS, `prettier --check` PASS. Dedupe: no upstream issue/PR for these helpers. — outcome: pr-opened (https://github.com/olitreadwell/analytics/pull/8, branch `add-number-formatter-tests`).
- `2026-09-08` trivial/minor-fix pass (typos/stale refs) — 5 genuine meaning-preserving fixes in ONE PR (5 files): k6s->k6 in test/load/README.md; Identies->Identifies in tracker/test/fixtures/cookies-cookiebot.html; 'result rows rows'->'result rows' in priv/json-schemas/query-api-schema.json + generated assets/js/types/query-api.d.ts; 'You you have hit'->'You have hit' in test/plausible_web/controllers/auth_controller_test.exs. Deduped against 2026-09-03 trivial pass (PR #2 / upstream #6648: installatons, director, represeting, Basecamp link) — no overlap. — outcome: pr-opened (https://github.com/olitreadwell/analytics/pull/9, branch `fix-doc-typos-and-stale-refs`).

- `2026-09-10` trivial/minor-fix pass (typos/dead links/stale commands) — exhaustive search (codespell across repo, all markdown links curl-verified, stale command/path refs, duplicated-word scan). Only ONE new genuine fix found: `tracker/ARCHITECTURE.md` line 9 `/tracker/installation-support/` -> `tracker/installation_support/` (dir is underscore; hyphen path does not exist; both line 11 and line 72 already use the underscore form; not claimed by any open/merged upstream PR). Prior passes #6648 + PR #9 already harvested the rest. Below the MINIMUM 3 genuine fixes required per config trivial_fix_rules -> SKIPPED the cycle (outcome skipped, no PR opened). The single fix is parked in Mined gaps for a future combined pass.
- `2026-09-10` doc path fix: `tracker/ARCHITECTURE.md` line 9 `tracker/installation-support/` (hyphen) -> `tracker/installation_support/` (actual dir, underscore). Verified dir exists; line 11 and 72 use the underscore form; not in dedupe ledger and not claimed by any upstream PR. Single fix, was SKIPPED this cycle (below 3-fix minimum); combine into a future packed trivial PR.

- `2026-09-23` trivial/minor-fix pass (typos/stale refs) — 5 genuine, verified, meaning-preserving fixes in ONE PR (6 files): (1) `assets/js/dashboard/segments/segment-modals.tsx` + `.test.tsx` 'Segment not found with with'->'...with' (duplicated 'with' in a user-facing 404 error; test assertion updated to match); (2) `lib/plausible/stats/sql/expression.ex` @moduledoc 'tagged with with'->'tagged with'; (3) `extra/lib/plausible/installation_support/checks/url.ex` comment 'the the domains'->'the domains'; (4) `test/plausible_web/live/register_form_test.exs` test name 'on on-existent'->'on non-existent'; (5) `tracker/ARCHITECTURE.md` line 9 `/tracker/installation-support/`->`/tracker/installation_support/` (the single fix parked in Mined gaps since 2026-09-10, now included). Deduped against prior passes (PR #2/#6648, PR #9) — no overlap. Verified locally: jest segment-modals.test.tsx PASS (7/7), eslint PASS, prettier --check PASS, tsc --noEmit PASS. — outcome: pr-opened (https://github.com/olitreadwell/analytics/pull/27, branch `fix-typos-and-doc-path`).
## Mined gaps (discovered, not yet attempted)
- `2026-09-09` backend `Plausible.Pagination.to_int/1` (`lib/plausible/pagination.ex`) raises `ArgumentError` on a non-integer `limit` string. NOT reachable via the Plugins API: `OpenApiSpex.Plug.CastAndValidate` (declared `limit: type: :integer`) rejects non-integer with 400 before the action runs. Only consumers are Plugins API controllers. — status: dropped (not reachable via public API).
