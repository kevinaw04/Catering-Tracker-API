# Development Workflow — Human-led, Agent-assisted

## Principle

The developer owns product requirements, architecture, acceptance, and releases. Codex may propose and implement scoped changes; it does not independently decide what Gutbusters needs.

## Branch and review process

1. Start from a tested, committed baseline. Before beginning: `git status`, inspect uncommitted changes, and do not discard them.
2. Create a focused branch, e.g. `feature/frontend-concepts` or `feature/frontend-orders`.
3. Give the agent a small task and ask for **analysis and plan first**. Do not authorize large implementation until the plan is approved.
4. Keep each change narrow. Frontend-only work must stay in `frontend/` unless a separate permission is granted.
5. Ask the agent to list modified files and explain what each change does. Review `git diff` yourself.
6. Run available checks and manually test realistic cashier workflows using synthetic data.
7. Only after approval: commit with a descriptive message, push if desired, and merge through a reviewed PR or an explicitly approved local merge.

## Stage gates for the frontend

**Stage A — Design:** Inspect API and product requirements; propose three genuinely different, previewable order-list designs. Use labeled fictional data, no backend edits. Developer selects direction.

**Stage B — Functional UI:** Connect approved design to the current API. Implement listing, pickup-date filtering, view, create, edit, paid/completed updates. Verify all server interactions and state/error handling.

**Stage C — Polish:** Apply Unslop only after a functional version is committed, in its own reviewable change. Check that styling changes do not break accessibility, forms, or responsiveness.

**Stage D — Production hardening:** Requires a separate approved plan for employee authentication, appropriate error handling/validation, backups, cloud hosting, monitoring, and owner handoff. No public rollout before this gate.

## Definition of done for each agent task

- Requested feature works in the intended scope with no unrelated modifications.
- Agent reports exact commands run and whether each passed or failed.
- No credentials, customer information, or generated build artifacts are staged.
- Changed files and new dependencies are identified and justified.
- Developer reviews UI behavior, particularly while creating an order, updating it after a customer call, and confirming pickup/payment.
- Existing backend functionality remains intact.
- Developer explicitly approves the commit/merge.

## Red flags — stop and ask

- Task requires changes to Java code, endpoints, database schema, Docker Compose, or production infrastructure.
- Agent wants to introduce a new backend, microservices, Kubernetes, cache, message queue, or complex concurrency layer.
- Agent suggests fake production data, hardcoded authentication, direct browser-to-database access, or secret exposure.
- Agent claims an endpoint or business feature exists when it does not.
- Tests fail, changes are unexpectedly broad, or unrelated files appear in a diff.

## Useful verification commands

```bash
git status
git diff --stat
git diff
# When a React frontend exists:
cd frontend
npm run build
# Run lint/tests if the generated package.json actually defines those scripts.
```

Do not assume a check exists, or report it as passed, until it has actually been run.
