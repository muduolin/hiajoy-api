import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();


router.get("/audio", async (req: Request, res: Response) => {
  const page = req.query.page ?? 0;
  const pageSize = req.query.pageSize ?? 10;
  
    const audios = await prisma.meditation.findMany();
 
    res.status(200).json({success: true, data: audios});
});

module.exports = router;
