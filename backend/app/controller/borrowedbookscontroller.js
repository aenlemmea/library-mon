const {
  getBooks: _getBooks, getLogs: _getLogs, returnBook,
} = require('../serv/borrowedbooksservice.js');
const { NotFoundError } = require('../error/erroradvise.js');

async function getBooks(req, res, next) {
  try {
    res.status(200).json(_getBooks());
  } catch (err) {
    next(err);
  }
}

async function postReturnBook(req, res, next) {
  try {
    const id = parseId(req.body.id);
    const updated = returnBook(id);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}

async function getLogs(req, res, next) {
  try {
    res.status(200).json(_getLogs());
  } catch (err) {
    next(err);
  }
}

// Helper
function parseId(rawId) {
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) {
    throw new NotFoundError(`Invalid id: ${rawId}`);
  }
  return id;
}

module.exports = {
  parseId,
  getBooks, postReturnBook, getLogs,
};