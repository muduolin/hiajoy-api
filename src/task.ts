import express, { Request, Response } from "express";
import { decrypt } from "./lib/security";
import * as db from "./db";
import { Task } from "./lib/types";

const router = express.Router();

router.get("/task", async (req: Request, res: Response) => {
  const page = req.query.page ?? 0;
  const pageSize = req.query.pageSize ?? 10;
  const key_id = req.get("key");

  if (key_id) {
    const id = decrypt(key_id);
 console.log(id)
    const data = await db.getTask(req, id, +page, +pageSize);
    if (data) {
      res.status(200).json({ success: true, data: data });
    } else {
      res.status(200).json({ success: false, message: "no tasks" });
    }
  } else
    res.status(200).json({ success: false, message: "cannot retrieve tasks" });
});

router.post("/task", async (req: Request, res: Response) => {
  const name = req.body["name"];
  const description = req.body["description"];
  const key_id = req.get("key");

  if (key_id) {
    const id = decrypt(key_id);
    var inserted = await db.createTask(req, id, name, description);
    if (inserted) {
      res.status(200).json({ success: true, data: inserted });
    } else {
      res.status(200).json({ success: false, message: "task not inserted" });
    }
  } else {
    res
      .status(200)
      .json({ success: false, message: "cannot create journal entry" });
  }
});

router.put("/task", async (req: Request, res: Response) => {
  const id = req.body["id"] as number;
  const name = req.body["name"] as string;
  const description = req.body["description"] as string;
  const isComplete = req.body["isComplete"] as boolean;
  const key_id = req.get("key");

  if (key_id) {
    const uid = decrypt(key_id);
    var updated = await db.updateTask(req, uid, {
      id: +id,
      name: name,
      description: description,
      isComplete: isComplete,
    } as Task);
    console.log(updated);
    if (updated) {
      res.status(200).json({ success: true, data: updated });
    } else {
      res.status(200).json({ success: false, message: "task not updated" });
    }
  } else {
    res
      .status(200)
      .json({ success: false, message: "cannot update task entry" });
  }
});

router.delete("/task", async (req: Request, res: Response) => {
  const id = req.body["id"];
  const key_id = req.get("key");

  if (key_id) {
    const uid = decrypt(key_id);
    var updated = await db.deleteTask(req, uid, id);
    console.log(updated);
    if (updated) {
      res.status(200).json({ success: true, data: updated });
    } else {
      res.status(200).json({ success: false, message: "task not found" });
    }
  } else {
    res
      .status(200)
      .json({ success: false, message: "cannot delete task entry" });
  }
});

module.exports = router;
