const { Router } = require('express');
const { getBooks, postReturnBook, getLogs } = require('./borrowedbookscontroller.js');

const libraryRoutes = Router();

/**
 * @openapi
 * /api/books:
 *   get:
 *     summary: Get inventory metrics and all book records
 *     responses:
 *       200:
 *         description: Metrics and book list
 */
libraryRoutes.get('/api/books', getBooks);

/**
 * @openapi
 * /api/return-book:
 *   post:
 *     summary: Mark a book as returned
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id]
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated book
 *       404:
 *         description: Not found
 */
libraryRoutes.post('/api/return-book', postReturnBook);

/**
 * @openapi
 * /api/logs:
 *   get:
 *     summary: Get the 10 most recently returned books
 *     responses:
 *       200:
 *         description: Recent return activity
 */
libraryRoutes.get('/api/logs', getLogs);

module.exports = { libraryRoutes };