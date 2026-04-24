# Phase 5 Backend Test Checklist

Use this checklist to verify the backend API after starting Spring Boot.

## Prerequisites

- MySQL service running.
- `data_store_db` database exists.
- `users` table created from `src/main/resources/db/schema.sql`.
- Backend running on `http://localhost:8080`.

## Automated smoke test (PowerShell)

From `backend/`:

```powershell
.\scripts\phase5-api-smoke-test.ps1
```

Expected final line:

```text
Phase 5 smoke test PASSED.
```

## Manual curl checks (optional)

Create:

```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test.user@example.com\",\"age\":21}"
```

Get all:

```bash
curl http://localhost:8080/api/users
```

Get one:

```bash
curl http://localhost:8080/api/users/{id}
```

Update:

```bash
curl -X PUT http://localhost:8080/api/users/{id} \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Updated User\",\"email\":\"updated.user@example.com\",\"age\":22}"
```

Delete:

```bash
curl -X DELETE http://localhost:8080/api/users/{id}
```

## Expected status codes

- `POST /api/users` -> `201`
- `GET /api/users` -> `200`
- `GET /api/users/{id}` -> `200` or `404`
- `PUT /api/users/{id}` -> `200` or `404`
- `DELETE /api/users/{id}` -> `204` or `404`
- invalid request body -> `400`
