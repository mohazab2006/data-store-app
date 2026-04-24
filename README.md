# Data Store App

## Overview

This is a full-stack web application built with:

* **Backend:** Spring Boot, MySQL, JDBC
* **Frontend:** React, TypeScript

The application allows users to store and manage data through a REST API and a simple user interface. The application exposes a REST API for storing and managing user data, with a frontend interface that interacts with the API using Axios.

This project focuses on understanding low-level database interactions using JDBC, with future plans to explore Hibernate as a higher-level ORM approach for comparison and deeper backend learning.

---

## Current implementation

The backend currently uses **JDBC (Java Database Connectivity)** to interact directly with the database.

This means:

* SQL queries are written manually
* Data is handled at a low level
* Full control over database operations

This approach is used to **build a strong understanding of how data flows between the application and the database**.

---

## Future improvement (Hibernate)

In the future, this project will be upgraded to use **Hibernate (an ORM framework)**.

Hibernate will:

* Automatically convert Java objects into database records
* Reduce the need to write SQL manually
* Simplify database operations

---

## Why this change?

The goal is to:

1. First understand how databases work using JDBC
2. Then switch to Hibernate to learn a more modern and widely used approach

This will make it easier to compare:

* **JDBC:** manual, low-level control
* **Hibernate:** automated, higher-level abstraction

---

## Goal

By completing both versions, this project demonstrates:

* Strong backend fundamentals
* Understanding of database interactions
* Ability to use both low-level and high-level data access approaches

---

## Phase 1 (done)

Spring Boot backend scaffold with MySQL JDBC connectivity. Create the database `data_store_db`, then provide your MySQL password (never commit it):

**Option A — local file (recommended):** copy `backend/application-local.properties.example` to `backend/application-local.properties` and set `spring.datasource.password` to your MySQL root password. That file is gitignored.

**Option B — environment variable:** in PowerShell before running the app: `$env:SPRING_DATASOURCE_PASSWORD="yourpassword"`

Then:

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

On Linux or macOS, use `./mvnw` instead of `.\mvnw.cmd`. If you use a global Maven install, `mvn spring-boot:run` works the same way.

On successful startup you should see a log line: `MySQL connection OK (database reachable).`

---

## Phase 2 (done)

- **Java model:** `backend/src/main/java/com/example/datastore/model/User.java` (`id`, `name`, `email`, `age`).
- **SQL:** `backend/src/main/resources/db/schema.sql` defines the `users` table for `data_store_db`.

Apply the table once (Workbench or CLI), for example:

```powershell
mysql -u root -p data_store_db -e "SOURCE C:/Projects/data-store-app/backend/src/main/resources/db/schema.sql"
```

Or open `schema.sql` in MySQL Workbench while `data_store_db` is selected and execute it.

Verify: `SHOW TABLES;` should list `users`.

---

## Phase 3 (done)

- Added JDBC repository: `backend/src/main/java/com/example/datastore/repository/UserRepository.java`
- Implemented SQL operations with prepared statements and row mapping:
  - `create(User)`
  - `findAll()`
  - `findById(Long id)`
  - `update(Long id, User user)`
  - `deleteById(Long id)`

Phase 3 focuses on direct JDBC data access; service and controller layers come next.

---

## Phase 4 (done)

- Added service layer: `backend/src/main/java/com/example/datastore/service/UserService.java`
  - business validation (`name`, `email`, `age`)
  - user-not-found handling
  - duplicate-email conflict mapping
- Added REST controller: `backend/src/main/java/com/example/datastore/controller/UserController.java`
  - `POST /api/users`
  - `GET /api/users`
  - `GET /api/users/{id}`
  - `PUT /api/users/{id}`
  - `DELETE /api/users/{id}`
- Added global API error handling with proper status codes:
  - `400 Bad Request`
  - `404 Not Found`
  - `409 Conflict`
  - `500 Internal Server Error`
- Enabled CORS for local frontend origins: `http://localhost:5173` and `http://localhost:3000`

---

## Phase 5 (done)

- Added backend API testing artifacts:
  - `backend/scripts/phase5-api-smoke-test.ps1` (automated CRUD smoke test)
  - `backend/docs/phase5-backend-test-checklist.md` (manual checklist and curl examples)
- Smoke test covers:
  - create user
  - fetch one/all users
  - update user
  - delete user
  - verify deleted user returns `404`
