# Remaining steps (Data Store App)

This file tracks what is **left to build** after the backend foundation and API test phase. Phases 1–5 are done; start here for **Phase 6**.

---

## Current status

| Phase | Topic | Status |
|-------|--------|--------|
| 1 | Backend setup (Spring Boot, MySQL, JDBC connectivity) | Done |
| 2 | `User` model + `users` table | Done |
| 3 | JDBC `UserRepository` (CRUD) | Done |
| 4 | `UserService` + `UserController` + errors + CORS | Done |
| 5 | Backend API testing (scripts + checklist) | Done |
| 6 | Frontend project setup (React, TypeScript, Axios) | **Next** |
| 7 | Frontend CRUD UI (form, list, edit, delete) | Pending |
| 8 | Full-stack integration + polish (CORS verify, errors, UX) | Pending |

---

## Phase 6 — Frontend setup

**Goal:** A runnable React + TypeScript app that can call the backend over HTTP.

Suggested tasks:

- Create `frontend/` (e.g. Vite + React + TypeScript).
- Add **Axios** and a small config for the API base URL (e.g. `http://localhost:8080`).
- Add a minimal `App` shell that compiles and runs (e.g. `npm run dev` on port **5173** to match existing CORS).
- Document in the root `README` how to install and run the frontend.

**Done when:** `npm install` + `npm run dev` works and the app loads in the browser (even a blank or placeholder page).

---

## Phase 7 — Frontend features

**Goal:** UI that exercises all user CRUD operations against `/api/users`.

Suggested structure (from the project spec):

- `src/types/User.ts` — `id`, `name`, `email`, `age`
- `src/services/userService.ts` — `getUsers`, `getUserById`, `createUser`, `updateUser`, `deleteUser` (Axios)
- `src/components/UserForm.tsx` — create (POST)
- `src/components/UserList.tsx` — list (GET all), delete (DELETE), open edit
- `src/components/EditUserForm.tsx` — update (PUT) for the selected user

**Done when:** You can add, list, view one, edit, and delete users end-to-end with the backend running.

**Minimum first slice (optional):** create + list + delete, then add get-one + update.

---

## Phase 8 — Connect everything + polish

**Goal:** Production-like local dev experience and clear feedback when things go wrong.

Tasks:

- Confirm **CORS** works from the Vite port (`http://localhost:5173`) and adjust backend origins if you use a different port or tool.
- Surface **API errors** in the UI (400, 404, 409, 500) with readable messages.
- Add light **UX polish:** labels, spacing, success/error toasts or inline messages, loading state.
- Re-test the full flow: backend + frontend together.

**Done when:** A single user can complete the full CRUD story without Postman, with tolerable error handling and UI feedback.

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

| Action | Method | Path |
|--------|--------|------|
| Create | `POST` | `/api/users` |
| List | `GET` | `/api/users` |
| Get one | `GET` | `/api/users/{id}` |
| Update | `PUT` | `/api/users/{id}` |
| Delete | `DELETE` | `/api/users/{id}` |

Payload shape (JSON): `{ "name": "...", "email": "...", "age": <number> }` (omit `id` on create).

---

## Related files in this repo

- Phase 5 smoke test: `backend/scripts/phase5-api-smoke-test.ps1`
- Phase 5 manual checklist: `backend/docs/phase5-backend-test-checklist.md`
- DB schema: `backend/src/main/resources/db/schema.sql`

When you finish a phase, update the main `README.md` and optionally this file so the roadmap stays accurate.
