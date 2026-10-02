const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const server = express();
const port = 3000;

server.use(express.json());

const db = new sqlite3.Database("database.db");
console.log("Connected to SQL Database");

const booksTable = `
CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  year INTEGER,
  status TEXT NOT NULL CHECK(status IN ('to-read', 'reading', 'completed'))
);
`;

db.run(booksTable, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Books table ready");
});

const allowedStatuses = ["to-read", "reading", "completed"];



server.get("/books", (req, res) => {
  const status = req.query.status;

  if (status) {
    db.all("SELECT * FROM books WHERE status = ?", [status], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.json(rows);
    });
  } else {
    db.all("SELECT * FROM books", (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.json(rows);
    });
  }
});


server.get("/books/:id", (req, res) => {
  const { id } = req.params;

  db.get("SELECT * FROM books WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!row) {
      res.status(404).json({ error: "Book not found" });
      return;
    }

    res.json(row);
  });
});

server.post("/books", (req, res) => {
  const { title, author, year, status } = req.body;

  if (!title || !author || !status) {
    res.status(400).json({ error: "title, author, and status are required" });
    return;
  }

  if (!allowedStatuses.includes(status)) {
    res.status(400).json({ error: "Invalid status" });
    return;
  }

  const sql = `
    INSERT INTO books (title, author, year, status)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [title, author, year, status], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.status(201).json({ id: this.lastID });
  });
});

server.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const { title, year, status } = req.body;

  if (status !== undefined && !allowedStatuses.includes(status)) {
    res.status(400).json({ error: "Invalid status" });
    return;
  }

  if (title === undefined && year === undefined && status === undefined) {
    res.status(400).json({ error: "No valid fields provided for update" });
    return;
  }

  const fields = [];
  const values = [];

  if (title !== undefined) {
    fields.push("title = ?");
    values.push(title);
  }

  if (year !== undefined) {
    fields.push("year = ?");
    values.push(year);
  }

  if (status !== undefined) {
    fields.push("status = ?");
    values.push(status);
  }

  values.push(id);

  const sql = `UPDATE books SET ${fields.join(", ")} WHERE id = ?`;

  db.run(sql, values, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: "Book not found" });
      return;
    }

    res.json({ message: "Book updated" });
  });
});


server.delete("/books/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM books WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: "Book not found" });
      return;
    }

    res.json({ message: "Book deleted" });
  });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});