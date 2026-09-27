const { eq, desc, lt, and } = require('drizzle-orm');
const { db } = require('../db/connection.js');
const { borrowedBooks } = require('../model/borrowedbooks.js');


function findRecentReturns(limit = 10) {
  return db
    .select()
    .from(borrowedBooks)
    .where(eq(borrowedBooks.returned, 1))
    .orderBy(desc(borrowedBooks.returnedAt))
    .limit(limit)
    .all();
}

async function markAsReturned(id) {
  const now = new Date().toISOString();

    db.update(borrowedBooks)
    .set({
      returned: 1,
      returnedAt: now,
    })
    .where(eq(borrowedBooks.id, id))
    .run();

    return findById(id);
}

// Helper functions
function countAll() {
  return db.select().from(borrowedBooks).all().length;
}

function countReturned() {
  return db.select().from(borrowedBooks).where(eq(borrowedBooks.returned, 1)).all().length;
}

function countOverdue(today) {
  return db
    .select()
    .from(borrowedBooks)
    .where(and(eq(borrowedBooks.returned, 0), lt(borrowedBooks.dueDate, today)))
    .all().length;
}

function findAll() {
  return db.select().from(borrowedBooks).orderBy(desc(borrowedBooks.id)).all();
}

function findById(id) {
  return db.select().from(borrowedBooks).where(eq(borrowedBooks.id, id)).get() ?? null;
}

module.exports = {
  findAll, findById,
  findRecentReturns, countAll, countReturned, countOverdue, markAsReturned
};