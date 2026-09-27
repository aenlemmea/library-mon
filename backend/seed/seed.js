const { db } = require('../app/db/connection.js');
const { borrowedBooks } = require('../app/model/borrowedbooks.js');

const bookTitles = [
  "The Hobbit", "1984", "To Kill a Mockingbird", "Pride and Prejudice", 
  "The Great Gatsby", "Moby Dick", "War and Peace", "Crime and Punishment", 
  "The Odyssey", "Brave New World", "The Catcher in Rye", "Lord of the Flies"
];

const borrowers = [
  "Alice Smith", "Bob Jones", "Charlie Brown", "Diana Prince", 
  "Ethan Hunt", "Fiona Gallagher", "George Clark", "Hannah Abbott"
];

async function seed(limit) {
  console.log("Seeding database with dummy books...");

  const values = [];
  const today = new Date();

  for (let i = 1; i <= limit; i++) {
    const randomBook = `${bookTitles[Math.floor(Math.random() * bookTitles.length)]} (Vol. ${i})`;
    const randomBorrower = borrowers[Math.floor(Math.random() * borrowers.length)];
    
    const dayOffset = Math.floor(Math.random() * 61) - 30;
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + dayOffset);

    const returned = Math.random() > 0.4 ? 1 : 0;

    values.push({
      bookName: randomBook,
      borrowerName: randomBorrower,
      dueDate: dueDate.toISOString().split('T')[0], // YYYY-MM-DD
      returned: returned,
    });
  }

  await db.insert(borrowedBooks).values(values);
  console.log("Successfully seeded 75 books!");
  process.exit(0);
}

seed(75).catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});