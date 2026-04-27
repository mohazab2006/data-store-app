# Remaining steps (Data Store App)

This file tracks what is **left to build**. Phases **1–7** are done; continue with **Phase 8**.

---

## Current status

| Phase | Topic                                                                 | Status      |
| ----- | --------------------------------------------------------------------- | ----------- |
| 1     | Backend setup (Spring Boot, MySQL, JDBC connectivity)                 | Done        |
| 2     | `User` model + `users` table                                           | Done        |
| 3     | JDBC `UserRepository` (CRUD)                                           | Done        |
| 4     | `UserService` + `UserController` + errors + CORS                       | Done        |
| 5     | Backend API testing (scripts + checklist)                              | Done        |
| 6     | Frontend project setup (Vite, React, TypeScript, Axios, Tailwind)     | Done        |
| 7     | Frontend CRUD UI (form, list, edit, delete)                            | Done        |
| 8     | Full-stack integration + polish (CORS verify, edge cases, UX passes) | **Next** |

---

## Phase 6 — Frontend setup (done)

Delivered:

- `frontend/` — Vite + React + TypeScript
- Axios + configurable `VITE_API_BASE_URL` (`frontend/.env.example`)
- Tailwind CSS v4 via `@tailwindcss/vite`
- Dev server on port **5173** (aligned with backend CORS)

---

## Phase 7 — Frontend features (done)

Delivered:

- `src/types/User.ts`
- `src/services/userService.ts` (+ `apiClient.ts`)
- `src/components/UserForm.tsx`, `UserList.tsx`, `EditUserForm.tsx`
- `src/App.tsx` — hero, layout, status banners, wired CRUD

---

## Phase 8 — Connect everything + polish (**next**)

**Goal:** Confidence that local full-stack dev is smooth end-to-end.

Suggested tasks:

- Run **backend + frontend together** and click through every action (including duplicate-email `409`, invalid form `400`, missing user `404`).
- Confirm **CORS** if you change ports or use another dev host.
- Optional UX passes: loading feedback, empty states, keyboard focus on errors (already partially covered).

**Done when:** You trust the app for demos without falling back to Postman for happy-path CRUD.

---

## After version 1 (optional “version 2”)

Not required for the first JDBC version:

- Replace the JDBC repository with **Hibernate / Spring Data JPA** while keeping the same API surface and MySQL schema (or a compatible one), to compare ORM vs raw JDBC.

---

## Out of scope (for this learning project)

- **Microservices** — keep one backend service; splitting into user-service, auth-service, etc. is a later topic.
- **Authentication / login** — add only if you expand the spec; the current scope is data + CRUD.

---

## Quick reference: backend API

With the server on `http://localhost:8080`:

| Action   | Method   | Path               |
| -------- | -------- | ------------------ |
| Create   | `POST`   | `/api/users`       |
| List     | `GET`    | `/api/users`       |
| Get one  | `GET`    | `/api/users/{id}`  |
| Update   | `PUT`    | `/api/users/{id}`  |
| Delete   | `DELETE` | `/api/users/{id}`  |

Payload shape (JSON): `{ "name": "...", "email": "...", "age": <number> }` (omit `id` on create).

---

## Related files in this repo

- Frontend: `frontend/`
- Phase 5 smoke test: `backend/scripts/phase5-api-smoke-test.ps1`
- Phase 5 manual checklist: `backend/docs/phase5-backend-test-checklist.md`
- DB schema: `backend/src/main/resources/db/schema.sql`

When you finish a phase, update the main `README.md` and optionally this file so the roadmap stays accurate.
