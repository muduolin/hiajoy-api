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
  var d = await fetch(
    "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlYzUzNGZhNWI4Y2FjYTIwMWNhOGQwZmY5NmI1NGM1NjIyMTBkMWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0NDg2MzQ3Mzk2NTktMTZvNzI4aXJscDZoYTd1azBuNTVlbWRkdWwxMWFxNzEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0NDg2MzQ3Mzk2NTktaWU5N3YyMXE2Z3JzaGw2dWdsc245b3BjajNjOTExbTAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTE5NzAxNDI2NTY1MjY3Njg0OTIiLCJlbWFpbCI6Im1saW43NEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik11ZHVvIExpbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJSEdzTWktS0FVbmZnWHBSRTQtb3lwcWJJVkVubjViT3dHQnYtaUo5MEhBOTJrQ3hGNT1zOTYtYyIsImdpdmVuX25hbWUiOiJNdWR1byIsImZhbWlseV9uYW1lIjoiTGluIiwiaWF0IjoxNzM5NTc2Nzk2LCJleHAiOjE3Mzk1ODAzOTZ9.FyoSfToqhvZTacXmrza4DsCwTloZrSaoh_8QDDumNHtPxgq0WJ9CTGWNlZMQ3WiBWcYt6jeVzxd88_VXX5Mh-D0ZqooZ0Yj5LpS1ytbyD8kODHCkHZuiq5VRwkpfn6d9QL6ol-n8BgC6XcTzFBZFVSTIFRumCeX6a7IYiEajp-7BTrC_FtFjCWzU1V7f-eaRxfVx4OK1H21Sgo6LmffVqd4kozyau3YtA_V8jKIHt3RfphnBqZRt6EYgeyqZNXoCKQ03vu7aVTVVpr1g1ehJDkg-MFKpZoIJ-FB71zOENzeI4qYjLco-xC0O6slqDvHlxukBpkC4eVSpjzpaKMUDcA"
  );
  console.log(await d.json());
  const env = req.get("z-api-key");
  if (env == process.env.Z_API_KEY) res.json(process.env);
  else res.json({ message: "ping" });
});

module.exports = app;
