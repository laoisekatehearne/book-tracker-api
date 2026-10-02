# Book API

A book tracking backend built with Node.js, Express and SQLite. It allows books to be added, viewed, updated, deleted and filtered by reading status through a REST API.

## Technologies

- JavaScript
- Node.js and Express
- SQLite
- Postman for API testing

## Database structure

The database contains a single `books` table.

Each book stores:

- **Title**
- **Author**
- **Year**
- **Status**

The available reading statuses are:

- `to-read`
- `reading`
- `completed`

The database uses an auto-incrementing ID for each book.

```markdown
## Getting started

You will need Node.js and npm installed.

Download or clone this repository, then open a terminal in the project folder containing `package.json`.

### 1. Install dependencies

```bash
npm install
```

If Windows PowerShell blocks npm, use:

```bash
npm.cmd install
```

### 2. Start the server

```bash
node server.js
```

When the server starts, it connects to `database.db` and creates the `books` table automatically if it does not already exist.

The server runs at:

`http://localhost:3000`

### 3. Try the API

The API can be tested using Postman.

For example:

- `GET http://localhost:3000/books` — return all books.
- `GET http://localhost:3000/books/1` — return a book by ID.
- `GET http://localhost:3000/books?status=reading` — filter books by reading status.
- `POST http://localhost:3000/books` — add a new book.
- `PUT http://localhost:3000/books/1` — update a book.
- `DELETE http://localhost:3000/books/1` — delete a book.

Requests that create or update books should use JSON in the request body.

For example:

```json
{
  "title": "1984",
  "author": "George Orwell",
  "year": 1949,
  "status": "to-read"
}
```

The API returns JSON. This repository contains the backend; it does not include a frontend interface.
```
