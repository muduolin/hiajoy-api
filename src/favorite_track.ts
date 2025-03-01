import express, { Request, Response } from "express";
import * as db from "./db";
import { decrypt } from "./lib/security";

const router = express.Router();


router.get("/user/favorite_track", async (req: Request, res: Response) => {
  const key = req.get("key");

  if (key) {
    const id = decrypt(key); 
    
    const result = await db.getFavoriteTracks(req, id);
    console.log(result)
    res.status(200).json({ success: true, data:  result});
    
  } else {
    res.status(200).json({ success: false, message: "access key not valid." });
  }
});

router.post("/user/favorite_track", async (req: Request, res: Response) => {
  const track_id = req.body["track_id"];
  const key_id = req.get("key");

  if (key_id)
  {
    const id = decrypt(key_id); 
    var inserted = await db.createFavoriteTrack(req, id, track_id);
    if(inserted){
      res.status(200).json({success: true, data: inserted});
    }else
    {
      res.status(200).json({success: false, message: "track not found"});
    }
    
  }else{
    res.status(200).json({success: false, message: "cannot create favorite entry"});
  }
}); 

router.delete("/user/favorite_track", async (req: Request, res: Response) => {
  const track_id = req.body["track_id"];
  const key_id = req.get("key");

  if (key_id)
  {
    const id = decrypt(key_id); 
    var deleted = await db.deleteFavoriteTrack(req, id, track_id);
    if(deleted){
      res.status(200).json({success: true, message: "favorite track unfollowed"});
    }else
    {
      res.status(200).json({success: false, message: "track not found"});
    }
    
  }else{
    res.status(200).json({success: false, message: "cannot create favorite entry"});
  }
}); 

module.exports = router; 
 