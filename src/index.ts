import express from "express";
import pg from "pg";
import path from "node:path";
import * as dotenv from "dotenv";
const cors = require('cors');
import { PrismaClient } from "@prisma/client";

const middleware = require("./middleware");
const journalRouter = require("./journal");
const userRouter = require("./user");
const bookRouter = require("./book");
const audioRouter = require("./audio");
const emailRouter = require("./email");
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

const client = new PrismaClient();
app.locals.prisma = client;

app.use(cors());
app.use(express.json());

app.use(middleware);
app.use(journalRouter);
app.use(bookRouter);
app.use(userRouter);
app.use(audioRouter);
app.use(emailRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
