# Directory

**Your people in one calm view.**

Directory is a contacts workspace for when a spreadsheet isn’t enough but a giant CRM is overkill—you see everyone on file, add someone fast, and change details only when you choose to. Nothing saves until you confirm.

---

## Why we built it

Spreadsheets scatter context across cells and tabs; threads bury updates in noise. Directory keeps **names, emails, and ages** on a single calm surface so you can **skim**, **capture**, and **correct** without fighting the tool. The UI is deliberate: dark, low-friction, built to stay readable when you’re in a hurry.

---

## What you get

- **One surface** — No jumping between files to answer “who’s on the list?”
- **Quick capture** — Welcome someone new in one short pass.
- **Edits with intent** — Open a row, adjust what changed, save—or walk away without touching stored data.
- **Duplicate awareness** — If an email already exists, you hear about it before it clutters your directory.
- **Finished feel** — Interaction and feedback tuned for clarity, not a homework CRUD checklist.

---

## Future implementation

The backend today uses **JDBC** on purpose: hand-written SQL and explicit mapping make it obvious how HTTP requests become rows in MySQL. That’s the baseline.

**Next evolution (planned):** introduce **Hibernate / Spring Data JPA** so the same product ideas are expressed through entities, repositories, and generated SQL—while keeping the **REST API contract** (and UX) stable. Goals:

- Compare **ORM vs JDBC** side by side on one domain (`User` / `users`).
- Reduce boilerplate where it makes sense; keep migrations and schema changes understandable.
- Optionally fold in **Phase 8** polish (full-stack edge cases, CORS, demo-ready passes)—tracked in [docs/REMAINING-STEPS.md](docs/REMAINING-STEPS.md).

Out of scope for this learning repo unless you expand the spec: microservices split, auth/login layers (unless you deliberately add them).

---

## Run it locally

You need **Node.js**, **JDK** (Spring Boot–compatible), and **MySQL**.

1. Create DB `data_store_db`, then run `backend/src/main/resources/db/schema.sql` (Workbench or `mysql … SOURCE …/schema.sql`).
2. Copy `backend/application-local.properties.example` → `backend/application-local.properties` and set your DB password *(never commit secrets)*. Or set `SPRING_DATASOURCE_PASSWORD`.
3. `cd backend` → `.\mvnw.cmd spring-boot:run` (use `./mvnw` on macOS/Linux). Wait for **MySQL connection OK**.
4. `cd frontend` → `npm install` → `npm run dev` → open **http://localhost:5173**  
   Optional `.env`: `VITE_API_BASE_URL` if the API isn’t `http://localhost:8080`.

Production UI: `cd frontend && npm run build`.

---

<details>
<summary><strong>Developers</strong> — stack, API, roadmap, tests</summary>

**Shape:** Monorepo — `frontend/` (React, TypeScript, Vite, Tailwind) talks to `backend/` (Spring Boot REST) backed by MySQL via JDBC so the path from UI → API → rows stays explicit.

**Roadmap / learning:** JDBC baseline now; Hibernate/JPA path summarized above — details and Phase 8 tasks in [docs/REMAINING-STEPS.md](docs/REMAINING-STEPS.md). Smoke scripts: `backend/scripts/`, `backend/docs/`.

**HTTP API**

| Method | Path | Purpose |
| ------ | ---- | ------- |
| `POST` | `/api/users` | Create |
| `GET` | `/api/users` | List |
| `GET` | `/api/users/{id}` | One |
| `PUT` | `/api/users/{id}` | Update |
| `DELETE` | `/api/users/{id}` | Remove |

Common statuses: `400` bad input, `404` missing, `409` duplicate email.

</details>

---

Use freely for learning and portfolio demos; add a proper license if you ship beyond personal use.
