# Directory

**Your people in one calm view.** Directory is a full-stack contacts workspace: add someone in a moment, skim the list without noise, and edit details only when you mean to—nothing saves until you confirm.

---

## What you get

- **Single surface** — Names, emails, and ages together so you’re not jumping between spreadsheets and threads.
- **Quick capture** — One short form to welcome someone new.
- **Edits with intent** — Open a row, adjust what changed, save—or cancel without touching stored data.
- **Duplicate awareness** — If an email already exists, you hear about it before it clutters your list.
- **Polished experience** — Dark, focused UI built for clarity under pressure—not a toy CRUD demo dressed as a product.

---

## Try it locally

You’ll need **Node.js**, a **JDK** compatible with Spring Boot 3.x, and **MySQL**.

### 1. Create the database

Create a database named `data_store_db`, then apply the schema:

```powershell
mysql -u root -p data_store_db -e "SOURCE C:/path/to/data-store-app/backend/src/main/resources/db/schema.sql"
```

(Adjust the path to your clone. In MySQL Workbench, select `data_store_db` and run `schema.sql`.)

Verify with `SHOW TABLES;` — you should see `users`.

### 2. Configure the backend

Never commit database passwords. Pick one approach:

**A — Local file (recommended)**  
Copy `backend/application-local.properties.example` to `backend/application-local.properties` and set `spring.datasource.password`.

**B — Environment variable**  

```powershell
$env:SPRING_DATASOURCE_PASSWORD="yourpassword"
```

Start the API:

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

On macOS/Linux use `./mvnw`. You should see a log line like **MySQL connection OK (database reachable).**

### 3. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Optional: copy `frontend/.env.example` to `frontend/.env` and set `VITE_API_BASE_URL` if your API isn’t at `http://localhost:8080`.

Open **http://localhost:5173** — the UI talks to the API over HTTP (CORS allows local dev origins).

### Production build (frontend)

```bash
cd frontend
npm run build
```

---

## How it fits together

| Layer        | Role |
| ------------ | ---- |
| **Experience** | React + TypeScript (Vite), Tailwind, Axios — forms, table, and feedback tuned for scanning and trust. |
| **Application** | Spring Boot REST API — validation, duplicate handling, predictable responses. |
| **Data**        | MySQL — accessed with JDBC so the data path stays explicit and easy to reason about. |

The repository is a **monorepo**: `backend/` for the API, `frontend/` for the client.

---

## Learning & roadmap

This project is also a deliberate learning path: **JDBC first** (hand-written SQL and clear mapping) so the path from HTTP to rows is visible end to end. A future pass may introduce **Hibernate** for comparison with a higher-level ORM—see [docs/REMAINING-STEPS.md](docs/REMAINING-STEPS.md) for what’s next and optional follow-ups.

API smoke tests and checklists live under `backend/scripts/` and `backend/docs/` if you want automated or manual verification.

---

## API (concise)

| Method | Path | Purpose |
| ------ | ---- | ------- |
| `POST` | `/api/users` | Create a person |
| `GET` | `/api/users` | List everyone |
| `GET` | `/api/users/{id}` | Fetch one |
| `PUT` | `/api/users/{id}` | Update |
| `DELETE` | `/api/users/{id}` | Remove |

Typical outcomes: success payloads, `400` for bad input, `404` when missing, `409` when email conflicts.

---

## License

Use and adapt for learning and portfolio use; add a license file if you ship this beyond personal demos.
