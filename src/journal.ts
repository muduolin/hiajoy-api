import express, { Request, Response } from "express";
import { decrypt } from "./lib/security";

const router = express.Router();
interface Journal {
  id: number;
  title: string;
  autcontenthor: string;
}

router.get("/journal", async (req: Request, res: Response) => {
  const page = req.query.page ?? 0;
  const pageSize = req.query.pageSize ?? 10;
  const key_id = req.get("id");

  if (key_id) {
    const email = decrypt(key_id);
    console.log(email);
    const offset = +pageSize * +page;
    console.log(pageSize);
    const client = await req.app.locals.pool.connect();
    const query = `SELECT id, title, content, "createdAt" FROM "journal" order by "createdAt" desc limit ${pageSize} offset ${offset}`;
    
    const result = await client.query(query);
    client.release();

    const data = result.rows as Journal[];
    res.status(200).json(data);
  }
  else
    res.status(200).json({});
});

module.exports = router;
