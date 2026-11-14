# Catering Tracker API

Catering Tracker is an order-management application being built for **Gutbusters Breakfast**. Its purpose is to replace an informal/paper-based catering tracking workflow with a simple, reliable system employees can use to create, find, and update catering orders.

**Status:** Working Spring Boot backend and Docker Compose development environment. A browser-based employee interface, authentication, and cloud production deployment are **not yet implemented**. Do not use this version with real customer information on a public network.

## What works today

- Create, list, retrieve, update, and delete catering orders through REST endpoints.
- Retrieve orders for a specific pickup date, ordered by pickup time.
- Record customer/contact information, original cashier name, order details, pickup date/time, party size, paid/completed flags, and notes.
- Reject creation of orders whose `numberOfPeople` is missing or not positive.
- Store data in PostgreSQL 18; develop with an API container and database container using Docker Compose.
- Preserve database files in a named Docker volume when Compose containers are removed and recreated (without `-v`).
- Exercise service behavior with JUnit and Mockito tests.

See [Product requirements](docs/PRODUCT.md) for real workflow decisions, [Development workflow](docs/WORKFLOW.md) for reviews and release steps, and [Agent instructions](AGENTS.md) for AI coding guardrails.

## Technology

| Layer | Technology |
| --- | --- |
| Backend | Java 21, Spring Boot 4.0.6, Spring MVC |
| Persistence | Spring Data JPA, PostgreSQL 18 |
| Build and tests | Maven Wrapper, JUnit, Mockito |
| Local containers | Docker, Docker Compose |
| Planned employee frontend | React, TypeScript, Vite |

### Code layout

```text
src/main/java/com/kevin/catering_tracker_api/
  controller/CateringOrderController.java
  service/CateringOrderService.java
  repository/CateringOrderRepository.java
  model/CateringOrder.java
  exception/GlobalExceptionHandler.java
src/main/resources/application.properties
src/test/java/com/kevin/catering_tracker_api/
Dockerfile
compose.yaml
```

## REST API (current)

| Method | Endpoint | Behavior |
| --- | --- | --- |
| GET | `/orders` | List all orders (no guaranteed sort order) |
| GET | `/orders/{id}` | Get one order |
| GET | `/orders/date/{date}` | List orders for `YYYY-MM-DD`, sorted by pickup time |
| POST | `/orders` | Create an order |
| PUT | `/orders/{id}` | Replace editable fields on an existing order |
| DELETE | `/orders/{id}` | Permanently delete an order (currently available in the API) |

**Important:** The current API accepts and returns the JPA `CateringOrder` entity directly. Date/time fields `pickupDate` and `datePlaced` use ISO local date-time strings, e.g. `2026-11-20T12:30:00`; a date-only value such as `2026-11-20` is not valid for these fields. The pickup-date **filter path** is date-only (`YYYY-MM-DD`). On update, the service copies all editable fields from the submitted body; the frontend must avoid accidentally wiping fields it did not intend to edit.

Example development request body (fictional test data only):

```json
{
  "customerName": "Sample Customer",
  "customerPhone": "555-0100",
  "cashierName": "Sample Cashier",
  "datePlaced": "2026-11-14T10:00:00",
  "pickupDate": "2026-11-20T12:30:00",
  "numberOfPeople": 25,
  "orderDetails": "Sample catering order",
  "paid": false,
  "completed": false,
  "notes": "Development test record"
}
```

There is no price/total field, order cancellation state, audit log, or authentication system in the current model/API. Do not imply these features are implemented.

## Local development with Docker Compose

Requirements: Docker Desktop, a working Java 21/Maven build for the JAR, and a private environment file.

1. Create `.env.local` in the repository root, using `.env.example` as a guide. Do **not** commit `.env.local`.
2. Verify the configuration: `docker compose --env-file .env.local config --quiet`.
3. Build the application JAR with the Maven Wrapper (`./mvnw package`), using the database/environment configuration needed by the existing Spring Boot context test. The current Dockerfile **copies a prebuilt JAR from `target/`**; `docker compose build` does not compile the Java project for you.
4. Start the stack: `docker compose --env-file .env.local up -d --build`.
5. Check services: `docker compose --env-file .env.local ps`.
6. Open `http://localhost:8080/orders` or use Postman against the API.
7. Shut down containers: `docker compose --env-file .env.local down`.

The Compose API uses `jdbc:postgresql://db:5432/catering_tracker` to connect to the internal database service. The database isn't published on the Mac's port 5432, so it remains separate from any PostgreSQL server running locally on the host.

**Data persistence:** `postgres_data` is a Docker named volume, not a backup. `docker compose down` preserves it; `docker compose down -v` removes it and can destroy all records stored there. Do not run destructive volume commands against data you need to keep.

## Testing

Service unit tests use JUnit and Mockito. Run `./mvnw test` with the required test environment available. The existing Spring context-loading test may require a reachable PostgreSQL instance and a configured password; a self-contained test database has not yet been configured. Report failures rather than bypassing them silently.

The existing tests do not establish production readiness. Browser workflows, security, API error handling, backups, and end-to-end integration still need coverage.

## Deployment and safety

**This Compose file is a development setup, not the final Gutbusters hosting solution.** The goal is a hosted frontend, hosted Spring Boot API, and managed PostgreSQL with backups and operational ownership that remains with the business after the original developer leaves.

Before any real customer data or public launch: implement authentication and authorization, secure configuration/HTTPS, appropriate validation and error handling, database backups and tested restoration, and an owner-approved operational handoff. Production deployment choices and costs require owner approval.

## Project collaboration

If using Codex or another coding agent, read [AGENTS.md](AGENTS.md) and [docs/WORKFLOW.md](docs/WORKFLOW.md) **before modifying anything**. Do not allow an agent to rewrite the backend, database, or Compose configuration as a side effect of frontend work.
