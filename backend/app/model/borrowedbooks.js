const { sqliteTable, integer, text } = require('drizzle-orm/sqlite-core');

// Added returnedAt due to track the history feed.
const borrowedBooks = sqliteTable('borrowed_books', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  bookName: text('book_name').notNull(),
  borrowerName: text('borrower_name').notNull(),
  dueDate: text('due_date').notNull(),
  returned: integer('returned').notNull().default(0),
  returnedAt: text('returned_at'),
});

module.exports = { borrowedBooks };