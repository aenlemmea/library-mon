const request = require('supertest');
const { app } = require('../app/listen.js'); // path to your Express app instance

describe('Library API Endpoints', () => {
  
  it('GET /api/books - returns list of books', async () => {
    const res = await request(app).get('/api/books');
    
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(false);
  });

  it('GET /api/logs - returns activity logs', async () => {
    const res = await request(app).get('/api/logs');
    
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/return-book - returns a book', async () => {
    const res = await request(app)
      .post('/api/return-book')
      .send({ id: 1 });

    expect(res.statusCode).toBe(200);
  });

});