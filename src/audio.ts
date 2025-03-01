import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { BlobServiceClient } from "@azure/storage-blob";
import { decrypt } from "./lib/security";
import * as db from "./db";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/audio", async (req: Request, res: Response) => {
  const page = req.query.page ?? 0;
  const pageSize = req.query.pageSize ?? 10;
  const tags = req.query.tags;
  var isPremium: boolean | null | undefined = false;
  const key_id = req.get("key");

  if (key_id) {
    const id = decrypt(key_id);

    const usr = await db.getUserById(req, id);
    isPremium = usr && usr.expiredAt && usr.expiredAt > new Date();
  }
  isPremium = isPremium ?? false;

  var audios;
  const offset = +pageSize * +page;

  var where = tags
    ? {
        tags: {
          hasEvery: tags.toString().split(","),
        },
      }
    : {};

  audios = await prisma.track.findMany({
    where: where,
    orderBy: [
      {
        set: "asc",
      },
      {
        id: "asc",
      },
    ],
    skip:offset,
    take: +pageSize,
    select: {
      id: true,
      is_premium: true,
      title: true,
      author: true,
      pubDate: true,
      image_url: true,
      audio_url: isPremium ?? false,
      audio_type: true,
      audio_length: true,
      tags: true,
      subtitle: true,
      description: true,
      play_count: true,
      favorite_count: true,
      set: true,
      type: true,
    },
  });

  res.status(200).json({ success: true, data: audios });
});

const container_name = "audios";
const connectionString =
  "DefaultEndpointsProtocol=https;AccountName=hiajoy;AccountKey=UQF1jhxdkv+av+MdUbyb3qS3Ux7e0U0bwZQ5LgvJ0c4AuABaZm9MwwWbN0aygB/5ZmDW3sHAVs69+AStYAiA/Q==;EndpointSuffix=core.windows.net";
const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(container_name);

router.get("/mp3/:file_name", async (req: Request, res: Response) => {
  const file_name = req.params.file_name;
  const blockBlobClient = containerClient.getBlockBlobClient(file_name);
  try {
    const downloadBlockBlobResponse = await blockBlobClient.download(0);
    console.log(downloadBlockBlobResponse);
    if (downloadBlockBlobResponse.readableStreamBody) {
      downloadBlockBlobResponse.readableStreamBody.pipe(res);
    } else res.status(200).json({ success: false, data: null });
  } catch (e) {
    res.status(200).json({ success: false, data: null });
  }
});
module.exports = router;
