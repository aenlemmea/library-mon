const BASE_URL = 'http://localhost:3000';

export async function getBooks() {
  const res = await fetch(`${BASE_URL}/api/books`);
  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json();
}

export async function getLogs() {
    const res = await fetch(`${BASE_URL}/api/logs`);
    if (!res.ok) throw new Error('Failed to fetch books');
    return res.json();
}

export async function returnBook(id) {
  const res = await fetch(`${BASE_URL}/api/return-book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error('Failed to return book');
  return res.json();
}