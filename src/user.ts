import express, { Request, Response } from 'express';
import { Journal } from "./lib/types";
const router = express.Router();

router.get('/account', async (request: Request, response: Response) => {
  const email = request.get("email");
  const token = request.get("token");
  const provider = request.get("provider");
  const client = await request.app.locals.pool.connect();
  const query = 'SELECT * FROM "Journal"';
  const result = await client.query(query);
  client.release();

  const data = result.rows as Journal[];
  response.status(200).json(data);
});

router.post('/categories', () => {
  // create a category
});

module.exports = router;