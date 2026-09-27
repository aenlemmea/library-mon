CREATE TABLE IF NOT EXISTS borrowed_books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  book_name TEXT NOT NULL,
  borrower_name TEXT NOT NULL,
  due_date TEXT NOT NULL,
  returned INTEGER NOT NULL DEFAULT 0,
  returned_at TEXT
);