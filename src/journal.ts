import express, { Request, Response } from 'express';
const router = express.Router();
interface Journal {
    id: number;
    title: string;
    autcontenthor: string;
  }

router.get('/journal/:id', async (req: Request, res: Response) => {
  const client = await req.app.locals.pool.connect();
  const query = 'SELECT * FROM "Journal"';
  const result = await client.query(query);
  client.release();

  const data = result.rows as Journal[];
  res.status(200).json(data);
});

router.post('/categories', () => {
  // create a category
});

module.exports = router;