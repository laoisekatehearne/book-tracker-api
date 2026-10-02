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

## Getting started

You will need Node.js and npm installed.

Download or clone this repository, then open a terminal in the project folder containing `package.json`.

### 1. Install dependencies

```bash
npm install
