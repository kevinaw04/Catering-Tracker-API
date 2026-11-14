****# Catering Tracker — Product Requirements and Scope

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
- Prioritize smartphones and tablets with a mobile-first, touch-friendly interface practical for restaurant use; support desktop as a secondary device.
- Keep workflows efficient and readable without decorative dashboard clutter.

## Design direction — Approved

Catering Tracker will use a modern, minimalist interface combining the visual precision of Linear with the practical usability of contemporary POS and operations software.

### Primary devices
- Approximately 90% of expected usage at Gutbusters will be on smartphones and tablets.
- Design mobile-first, with touch-friendly controls and workflows practical in a restaurant environment.
- Desktop support is secondary.

### Visual identity
- Modern SaaS aesthetic with refined typography, subtle borders, consistent spacing, and restrained accent colors.
- Orders are the primary focus, not decorative dashboard statistics.
- Avoid gradients, excessive shadows, oversized cards, unnecessary animations, and dated enterprise software styling.
- Keep navigation minimal and make important actions immediately discoverable.

### Layout and workflow
- **Selected layout: Concept C — Hybrid Operations**, combining compact order rows with directly accessible quick actions.
- Preserve prominent pickup times, customer information, order summaries, search, and pickup-date filtering in the main order list.
- Smartphones and tablets: prioritize comfortable touch targets, readability, and efficient cashier workflows. Desktop: retain a compact, easily scannable interface.
- Viewing: tapping an order opens a read-only right-side panel on sufficiently wide screens; phones and narrow tablets use a full-screen details view.
- Editing: a visible pencil icon on each order opens a dedicated full-page editing screen. An Edit action is also available from the details view.
- Clearly distinguish paid/unpaid and completed/pending statuses.
- Keep paid/unpaid and completed/pending actions directly accessible from the order list. Require confirmation before updating either status and offer an Undo option afterward.

### Light and dark mode
- Support both light and dark themes.
- Respect the system preference initially, with light mode as the fallback.
- Provide a visible theme toggle in the top navigation.
- Persist the user's selection in browser local storage.
- Use shared design tokens to maintain consistent styling across both themes.
- Maintain readable contrast and accessible controls in either theme.

### Initial design exploration — Completed
Three distinct, browser-previewable concepts were produced using fictional, clearly labeled sample data before backend integration.

The concepts explored different information layouts, not merely different colors:

1. **Concept A — Precision Table:** compact order table with a slide-over detail panel.
2. **Concept B — Split Workspace:** split-pane interface with an order list and persistent details panel.
3. **Concept C — Hybrid Operations:** compact order rows with prominent quick actions — **selected and approved**.

All three follow the approved visual direction and support light and dark mode. Preserve the existing prototypes for reference.

Hybrid Operations is the approved direction for frontend implementation, with the finalized viewing, editing, and status safeguards documented above. This design selection does not imply those behaviors or backend integration are already implemented.

### Constraints
- Preserve existing Spring Boot API contracts.
- Do not introduce pricing, payments, analytics, or unsupported features.
- Do not use real customer information in prototypes.
- Prioritize cashier efficiency and usability over visual effects.
- The frontend must remain straightforward to maintain after deployment.

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
