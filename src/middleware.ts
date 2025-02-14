import express, { Request, Response } from 'express';
const router = express.Router();

router.use((req, res, next) => {
  console.log("middleware checking x-key");
  const key = req.get("x-api-key");

  if (key != process.env.X_API_KEY) {
    console.log("middleware x-key failed");
    res.status(200).send({
      success: false,
      message: "middle authorization failed"
    });
  } else {
    next();
  }
});

module.exports = router;