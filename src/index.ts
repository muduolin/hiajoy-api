import express from "express";
import pg from "pg";
import path from "node:path";
import * as dotenv from "dotenv";
const cors = require('cors');
import { PrismaClient } from "@prisma/client";

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

app.use(require("./middleware"));
app.use(require("./journal"));
app.use(require("./user"));
app.use(require("./book"));
app.use(require("./track"));
app.use(require("./email"));
app.use(require("./favorite_track"));
app.use(require("./task"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
