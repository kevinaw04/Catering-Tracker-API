# AGENTS.md — Catering Tracker Coding Agent Instructions

This document applies to Codex and other coding agents working in this repository. Read `README.md`, `docs/PRODUCT.md`, and `docs/WORKFLOW.md` before editing.

## Mission

Help build a dependable internal catering management application for Gutbusters Breakfast. This is intended for real workplace use, not a demo. Favor correctness, clarity, usability, security, and maintainability over tech-stack expansion.

## Ground truth

- The existing Java 21 / Spring Boot API and PostgreSQL Compose setup work; preserve that known-good state.
- Inspect `CateringOrderController`, entity, service, repository, and tests before implementing an API-dependent feature. Do not guess API shapes.
- `pickupDate` and `datePlaced` are `LocalDateTime` values requiring date and time; date-filter path parameters use `YYYY-MM-DD`.
- Any authorized cashier must be able to modify any order, regardless of who originally created it.
- `DELETE /orders/{id}` is destructive in the current backend; do not assume cancellation or soft-delete exists.
- The current application has no user authentication, payment processing, price/total field, or audit history. Never claim otherwise.

## Current delegation scope: FRONTEND ONLY

You may, after the user approves a plan:
- Create/edit files under `frontend/` for a React + TypeScript + Vite application.
- Run necessary local frontend checks and development commands, subject to environment permissions.
- Create proposals or diffs for improvements outside `frontend/`, but **do not apply those changes** without explicit approval.

You must **not** modify these paths without explicit approval:
- `src/`, `pom.xml`, Maven wrapper files, `Dockerfile`, `compose.yaml`, `application.properties`.
- `.env*`, `.gitignore`, `AGENTS.md`, `README.md`, or `docs/`.
- Database schema, migrations, production infrastructure, or deployment settings.

Never create commits, push branches, merge PRs, deploy, change GitHub settings, delete data/volumes, or run destructive cleanup commands without the user's explicit approval for that action.

## Security and privacy

- Do not read, print, upload, commit, or expose `.env.local`, tokens, passwords, or secrets.
- No real customer information in demo data, tests, fixtures, screenshots, commits, or prompts.
- Never put PostgreSQL credentials into browser code or frontend environment variables.
- Do not expose an unauthenticated app publicly or add dummy authentication and claim it is secure.
- Avoid unreviewed third-party dependencies and remote scripts. Explain why any new dependency is necessary before adding it.

## Required working procedure

1. **Inspect:** State what files and API contracts matter. Keep changes to the requested scope.
2. **Plan:** Give a concise proposal, files to change, assumptions, and acceptance criteria. **Wait for user approval before broad implementation.**
3. **Implement incrementally:** One coherent feature at a time, working on a dedicated branch. Do not overwrite unrelated work.
4. **Verify:** Run type-check/build/lint and any relevant tests available. Manually check or describe exact verification steps for employee workflows. Report which checks were run and their actual results.
5. **Review:** Show changed files, important design decisions, shortcomings, and any new dependencies. Request approval before commit, push, or merge.

If a test fails, investigate and report it. Do not delete the test, weaken validation, hide error output, or claim success without evidence. If blocked by missing API support, stop and propose a backend change for approval rather than inventing functionality.

## Frontend acceptance criteria

- Main experience centers on a searchable/filterable order list; date filtering must use the existing endpoint where appropriate.
- Users can create, view, and update existing orders with the real backend contract.
- Preserve fields when submitting full `PUT` requests. Avoid unintentionally clearing unrelated data.
- Payment/completion controls reflect server-confirmed state; surface API failures and don't falsely show saved changes.
- Accessible labels, keyboard navigation, readable contrast, and touch-friendly tablet layout.
- No fabricated totals, invented API responses, or mock data presented as real orders.
- Avoid distracting visuals, over-engineered architecture, or unsupported business assumptions.

## Pre-production stop sign

Do **not** label this system production-ready or deploy it with real customer data until the user explicitly addresses employee authentication/authorization, security, backups/restoration, monitoring, and business ownership/handoff.
