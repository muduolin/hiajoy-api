import express, { Request, Response } from "express";
import { decrypt } from "./lib/security";
import * as db from "./db";
import { Journal } from "./lib/types";


const router = express.Router();

router.get("/journal", async (req: Request, res: Response) => {
  const page = req.query.page ?? 0;
  const pageSize = req.query.pageSize ?? 10;
  const key_id = req.get("key");

  if (key_id) {
    const id = decrypt(key_id);
    
    const data = await db.getJournal(req, id, +page, +pageSize)
    res.status(200).json({success: true, data: data});
  }
  else
    res.status(200).json({success: false, message: "cannot retrieve journals"});
});

router.post("/journal", async (req: Request, res: Response) => {
  const title = req.body["title"];
  const content = req.body["content"];
  const key_id = req.get("key");

  if (key_id)
  {
    const id = decrypt(key_id); 
    var inserted = await db.createJournal(req, id, title, content);
    if(inserted){
      res.status(200).json({success: true, data: inserted});
    }else{
      res.status(200).json({success: false, message: "journal not created"});
    }
    
  }else{
    res.status(200).json({success: false, message: "cannot create journal entry"});
  }
});

router.put("/journal", async (req: Request, res: Response) => {
  const id = req.body["id"];
  const title = req.body["title"];
  const content = req.body["content"];
  const key_id = req.get("key");

  if (key_id)
  {
    const uid = decrypt(key_id); 
    var updated = await db.updateJournal(req, uid, {id: +id, title: title, content: content} as Journal);
    console.log(updated)
    if(updated){
      res.status(200).json({success: true, data: updated});
    }else{
      res.status(200).json({success: false, message: "journal not updated"});
    }
    
  }else{
    res.status(200).json({success: false, message: "cannot update journal entry"});
  }
});

router.delete("/journal", async (req: Request, res: Response) => {
  const id = req.body["id"];
  const key_id = req.get("key");

  if (key_id)
  {
    const uid = decrypt(key_id); 
    var updated = await db.deleteJournal(req, uid, id);
    console.log(updated)
    if(updated){
      res.status(200).json({success: true, data: updated});
    }else{
      res.status(200).json({success: false, message: "journal not found"});
    }
    
  }else{
    res.status(200).json({success: false, message: "cannot delete journal entry"});
  }
});

module.exports = router;
