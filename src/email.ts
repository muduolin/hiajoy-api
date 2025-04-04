import express, { Request, Response } from "express";
import * as db from "./db";
import {EmailSender, getEmail} from "./mailer"

const router = express.Router();

router.post("/requestcode", async (req: Request, res: Response) => {
  const email = req.body["email"];

  const entity = await db.createEmail(req, email);
  
  if (entity && entity.id && entity.codeExpiredAt < new Date()) {
    var code = Math.floor(100000 + Math.random() * 900000);
    entity.code = code.toString();
    entity.codeExpiredAt = new Date((new Date().getTime()) + 10 * 60 * 1000);
    entity.sendEmailAt = new Date();
    entity.sendEmail = true;
    var updated = await db.updateEmail(req, entity);
    
    if (updated) {
      let sender = new EmailSender(await getEmail("sendcode", {code: entity.code}))

      sender.send(email, "Hiajoy: one time passcode");
      res.status(200).json({ success: true, message: "code sent to the email"});
    }
  } else res.status(200).json({ success: false, message: "too frequent request"});
});

router.post("/subscribe", async (req: Request, res: Response) => {
  const email = req.body["email"];

  const entity = await db.createEmail(req, email);

  res.status(200).json({ success: entity!= null});
});


router.delete("/unsubscribe", async (req: Request, res: Response) => {
  const email = req.body["email"];

  const entity = await db.deleteEmail(req, email);

  res.status(200).json({ success:  entity!= null});
});


module.exports = router;
