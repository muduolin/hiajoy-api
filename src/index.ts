import express, { Request, Response } from 'express';
import pg from 'pg';
import * as dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();
const connectionString =
  'postgresql://mlin74:Welcome4@calmo.postgres.database.azure.com:5432/prod?sslmode=require';

  const pool = new pg.Pool({
    connectionString: connectionString, // Configure as needed for Azure PostgreSQL
    ssl: {
      rejectUnauthorized: false, // For testing purposes, set to true in production
    },
  });

app.use(express.json());


interface Book {
  id: number;
  title: string;
  author: string;
}

const books: Book[] = [
  { id: 1, title: 'The Hitchhiker\'s Guide to the Galaxy', author: 'Douglas Adams' },
  { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' },
];

// GET all books
app.get('/books', (req: Request, res: Response) => {
  res.json(books);
});

// GET a book by ID
app.get('/books/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});

// POST a new book
app.post('/books', (req: Request, res: Response) => {
    const newBook: Book = { ...req.body, id: books.length + 1 };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT (update) an existing book
app.put('/books/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updatedBookIndex = books.findIndex(b => b.id === id);
    if (updatedBookIndex !== -1) {
      books[updatedBookIndex] = { ...req.body, id };
      res.json(books[updatedBookIndex]);
    } else {
      res.status(404).send('Book not found');
    }
});

// DELETE a book
app.delete('/books/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const deletedBookIndex = books.findIndex(b => b.id === id);
    if (deletedBookIndex !== -1) {
        books.splice(deletedBookIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Book not found');
    }
});

app.get('/users', async (req: Request, res: Response) => {
    const client = await pool.connect();
    const query = 'SELECT * FROM "Journal"';
    const result = await client.query(query);
    client.release();
    res.status(200).json(result.rows);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});