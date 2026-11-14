# Catering Tracker — Product Requirements and Scope

## Product purpose

Build a fast, dependable internal tool for Gutbusters Breakfast cashiers to manage catering orders. It should remain usable by the restaurant after the original developer leaves. **This is a proposed business application; management adoption has not yet been confirmed.**

## Actual restaurant workflow

1. A customer places an order in person or over the phone.
2. A cashier records the customer contact details, order, number of people, pickup date and time, and payment status.
3. If the customer calls or visits later to make changes, **any authorized cashier** can find and edit the same order; the original cashier need not be present.
4. On pickup day, an authorized cashier can view the order, confirm or update payment status, and mark it completed.

Avoid designing for speculative high-concurrency scenarios that are unlikely in this small cashier workflow. Basic data integrity is important, but advanced locking and orchestration are not MVP requirements.

## First usable employee frontend (MVP)

- Quickly view and find orders, especially by pickup date.
- Display customer name/contact, pickup time, number of people, order details, payment status, completion status, and notes.
- Create and edit orders using the existing API contracts.
- Allow every authorized cashier to edit any order. `cashierName` is a recorded field, **not** a permissions boundary.
- Mark orders paid/unpaid and completed/incomplete through the existing update mechanism.
- Show clear success, validation, loading, empty, and failure states.
- Work well on a cashier's desktop or tablet; remain usable on a phone.
- Keep workflows efficient and readable without decorative dashboard clutter.

## Design direction

Modern, restrained, polished operations software—**not** a dated restaurant dashboard. Make the searchable order list the primary interface. Prefer clear typography, good spacing, subtle status colors, and simple forms. Avoid huge statistic cards, gradients, excessive animation, unnecessary navigation, and invented financial KPIs.

The initial design stage should produce reviewable concepts **before** the agent builds the complete integrated interface. Use fictional placeholder data only in clearly identified previews, never in live operational screens.

## Scope boundaries

**Current API does have:** listing, lookup, date filter, creation, updates, permanent deletion, paid and completed flags.

**Current API does not have:** employee accounts/login, authorization, order cancellation/soft-delete, payment collection, prices/totals, audit trail, notifications, or capacity/slot enforcement.

Do not pretend absent features already exist, invent a price field, or wire frontend controls to nonexistent endpoints. Don't show a destructive delete control in the first employee UI without an explicit product decision about cancellation/history.

## Production requirements (later milestones)

- Real employee authentication and appropriate access controls (shared ability to edit orders).
- HTTPS, protected customer phone numbers and order details, and no browser exposure of database credentials.
- Backups with a tested recovery process.
- Owner-controlled hosting/billing, account access, maintenance responsibility, and documentation.
- Relevant validation, appropriate HTTP errors, and operational monitoring.

Production Kubernetes, microservices, Redis/Kafka, and elaborate concurrency systems are not currently justified by business needs. Explore Kubernetes separately with synthetic data for learning if desired.

## Product decision policy

When code and real restaurant workflow conflict, **surface the tradeoff and ask for a decision**. Do not silently redesign the business process. Prefer small, reversible changes that can be verified during realistic cashier scenarios.
