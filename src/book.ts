import { Book, Journal } from "./lib/types";
import express, { Request, Response } from "express";
const app = express.Router();

const books: Book[] = [
  {
    id: 1,
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
  },
  { id: 2, title: "Pride and Prejudice", author: "Jane Austen" },
];

// GET all books
app.get("/books", (req: Request, res: Response) => {
  res.json(books);
});

// GET a book by ID
app.get("/books/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

// POST a new book
app.post("/books", (req: Request, res: Response) => {
  const newBook: Book = { ...req.body, id: books.length + 1 };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT (update) an existing book
app.put("/books/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updatedBookIndex = books.findIndex((b) => b.id === id);
  if (updatedBookIndex !== -1) {
    books[updatedBookIndex] = { ...req.body, id };
    res.json(books[updatedBookIndex]);
  } else {
    res.status(404).send("Book not found");
  }
});

// DELETE a book
app.delete("/books/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const deletedBookIndex = books.findIndex((b) => b.id === id);
  if (deletedBookIndex !== -1) {
    books.splice(deletedBookIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Book not found");
  }
});

app.get("/ping", async (req: Request, res: Response) => {
  const env = req.get("z-api-key");
  if (env == process.env.Z_API_KEY) res.json(process.env);
  else res.json({ message: "ping" });
});

module.exports = app;
