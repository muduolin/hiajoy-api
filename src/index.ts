import express, { Request, Response } from "express";
import pg from "pg";
import * as dotenv from "dotenv";
const cors = require('cors');

const middleware = require("./middleware");
const journalRouter = require("./journal");
const userRouter = require("./user");
const bookRouter = require("./book");
const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // For testing purposes, set to true in production
  },
});
// set the pool for global use
app.locals.pool = pool;
app.use(cors());
app.use(express.json());

app.use(middleware);
app.use(journalRouter);
app.use(bookRouter);
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
