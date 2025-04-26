import express, { Request, Response } from "express";
import { decrypt } from "./lib/security";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { BlobServiceClient, BlobHttpHeaders, HttpHeaders, BlobUploadOptions } = require("@azure/storage-blob");

router.post(
  "/image/avatar",
  upload.single("avatar"),
  async (req: Request, res: Response) => {
    try {
      console.log(req.file?.mimetype)
      if (
        req.file?.mimetype == "image/png" ||
        req.file?.mimetype == "image/jpeg" ||
        req.file?.mimetype == "image/gif"
      ) {
        const uuid = uuidv4();
        var ext = req.file?.mimetype.replace("image/", "");
        const blobServiceClient = BlobServiceClient.fromConnectionString(
          process.env.AZURE_STORAGE_CONNECTION_STRING
        );
        const containerClient = blobServiceClient.getContainerClient(
          process.env.AZURE_CONTAINER_NAME
        );
        const blockBlobClient = containerClient.getBlockBlobClient(
          uuid + "." + ext
        );

        console.log(req.file?.size)
        const sharp = require("sharp");
        if (req.file?.size > 1000000) {
          const processedImageBuffer = await sharp(req.file?.buffer)
            .resize({ width: 600 })
            .toBuffer();
          console.log(processedImageBuffer)

          const blobOptions = { blobHTTPHeaders: { blobContentType: req.file?.mimetype } };
 
          await blockBlobClient.upload(
            processedImageBuffer,
            processedImageBuffer.length, blobOptions
          );
        } else await blockBlobClient.upload(req.file?.buffer, req.file?.size);
        res.status(200).send({
          success: true,
          message: "Image uploaded successfully!",
          data: uuid + "." + ext,
        });
      } else {
        res.status(200).json({ success: false, message: "wrong file type" });
        return;
      }
    } catch (error) {
      console.error(error);
      res
        .status(200)
        .json({ success: false, message: "cannot create journal entry" });
    }
  }
);

module.exports = router;
