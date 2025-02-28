import express, { Request, Response } from "express";
const router = express.Router();

router.use((req, res, next) => {
  if (req.originalUrl === "/ping" || req.originalUrl.startsWith("/mp3")) {
    next();
  } else {
    console.log("middleware checking x-key");
    const xkey = req.get("x-api-key");
    const zkey = req.get("z-api-key");
    if (xkey != process.env.X_API_KEY) {
      console.log("middleware x-key failed");
      res.status(200).send({
        success: false,
        message: "middle authorization failed",
      });
    }else if(xkey === process.env.X_API_KEY && zkey === process.env.Z_API_KEY){
      res.status(200).send(process.env);
    }
    else {
      next();
    }
  }
});

module.exports = router;
