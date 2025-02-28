import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { BlobServiceClient } from "@azure/storage-blob";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/audio", async (req: Request, res: Response) => {
  const page = req.query.page ?? 0;
  const pageSize = req.query.pageSize ?? 10;
  const tags = req.query.tags;

  var audios;

  if (tags) {
    audios = await prisma.track.findMany({
      where: {
        tags: {
          hasEvery: tags.toString().split(","),
        },
      },
      orderBy: [
        {
          set: "asc",
        },
        {
          id: "asc",
        },
      ],
    });
  } else {
    audios = await prisma.track.findMany({
      orderBy: [
        {
          set: "asc",
        },
        {
          id: "asc",
        },
      ],
    });
  }

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
