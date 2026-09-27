const repo = require('../repo/borrowedbooksrepository.js');
const { NotFoundError } = require('../error/erroradvise.js');

// Get total books, returned number of books, outstanding books,
// overdue books, return rate percentage and overdue rate.
function getBooks() {
  const today = new Date().toISOString().slice(0, 10);
  const total = repo.countAll();
  const returned = repo.countReturned();
  const overdue = repo.countOverdue(today);

  return {
    metrics: {
      total,
      returned,
      outstanding: total - returned,
      overdue,
      returnRate: total ? Number(((returned / total) * 100).toFixed(1)) : 0,
      overdueRate: total ? Number(((overdue / total) * 100).toFixed(1)) : 0,
    },
    books: repo.findAll(),
  };
}

// Get the recently returned 10 books.
function getLogs() {
  return repo.findRecentReturns(10);
}

// Get the borrowed book by id.
function getBorrowedBookById(id) {
  const book = repo.findById(id);
  if (!book) throw new NotFoundError(`Book ${id} not found`);
  return book;
}

function returnBook(id) {
  const book = repo.findById(id);
  if (!book) throw new NotFoundError(`Book ${id} not found`);
  return repo.markAsReturned(id);
}

module.exports = {
  getBorrowedBookById,
  getBooks, getLogs, returnBook,
};