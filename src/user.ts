import express, { Request, Response } from "express";
import { isValidEmail } from "./lib/util";
import { Md5 } from "ts-md5";
import { jwtDecode } from "jwt-decode";
import * as db from "./db";
import { encrypt, decrypt } from "./lib/security";
import { user } from "@prisma/client";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  const email = req.get("email");
  const password = req.get("password");
  const token = req.get("token");
  const provider = req.get("provider");

  var userEmail = null;
  var googleUser = null;

  if (email && password) {
    userEmail = email;
  } else if (provider == "google" && token) {
    // after google auth, pass the token to decode
    type GoogleUser = {
      email: string;
      picture: string;
      name: string;
    };
    console.log(token);
    var result = await fetch(
      "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + token,
      {
        method: "GET",
        mode: "no-cors",
      }
    );
    googleUser = (await result.json()) as GoogleUser;
    userEmail = googleUser.email;
    console.log("getting google email");
    console.log(googleUser);
  } else if (provider == "apple" && token) {
    // after apple auth, pass the token to decode
    type AppleUser = {
      email: string;
    };

    const decoded = jwtDecode<AppleUser>(token);
    userEmail = decoded.email;
    console.log("getting apple email");
  }

  if (userEmail) {
    var user = await db.getUserByEmail(req, userEmail);

    console.log("getting user from db");
    if (user && email && password) {
      // login with email and password
      if (user.password == Md5.hashStr(password)) {
        res.status(200).json({
          success: true,
          data: {
            isLogin: true,
            isPremium: user.expiredAt && user.expiredAt > new Date(),
            createdAt: user.createdAt,
            lastActiveAt: user.lastActiveAt,
            expiredAt: user.expiredAt,
            points: user.profile.points,
            affirmTrackId: user.profile.affirmTrackId,
            key: encrypt(user.id.toString()),
          },
        });
      } else {
        res
          .status(200)
          .json({ success: false, message: "authentication failed." });
      }
    } else if (user && token) {
      // log in with google or apple token

      res.status(200).json({
        success: true,
        data: {
          isLogin: true,
          isPremium: user.expiredAt && user.expiredAt > new Date(),
          createdAt: user.createdAt,
          lastActiveAt: user.lastActiveAt,
          expiredAt: user.expiredAt,
          points: user.profile.points,
          affirmTrackId: user.profile.affirmTrackId,
          key: encrypt(user.id.toString()),
        },
      });
    } else if (!user && token) {
      console.log("create new user");
      await db.createUser(req, userEmail, "clear-useless", provider);
      var userResult = await db.getUserByEmail(req, userEmail);

      if (userResult && googleUser && provider == "google") {
        userResult.avatar = googleUser.picture;
        userResult.username = googleUser.name;
        console.log("update new user");
        await db.updateUser(req, userResult);
      }

      userResult = await db.getUserByEmail(req, userEmail);
      console.log("get new user again");
      console.log(userResult);
      if (userResult) {
        res.status(200).json({
          success: true,
          data: {
            isLogin: true,
            isPremium: false,
            createdAt: userResult.createdAt,
            expiredAt: user.expiredAt,
            lastActiveAt: userResult.lastActiveAt,
            points: userResult.profile?.points,
            affirmTrackId: userResult.profile.affirmTrackId,
            key: encrypt(userResult.id.toString()),
          },
        });
      } else {
        res
          .status(200)
          .json({ success: false, message: "authentication failed." });
      }
    } else {
      res
        .status(200)
        .json({ success: false, message: "authentication failed." });
    }
  } else {
    res
      .status(200)
      .json({ success: false, message: "email authentication failed." });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  const email = req.body["email"];
  const password = req.body["password"];
  const code = req.body["code"];

  var emails = await db.searchEmail(req, email);

  if (
    emails &&
    emails[0] &&
    emails[0].code == code &&
    emails[0].codeExpiredAt > new Date()
  ) {
    if (email && isValidEmail(email) && password) {
      var user = await db.getUserByEmail(req, email);
      if (user) {
        res.status(200).json({ success: false, message: "email existed." });
        return;
      }
      var newUser = await db.createUser(req, email, Md5.hashStr(password));
      if (newUser) {
        res.status(200).json({
          success: true,
          message: "user registered",
          data: { key: encrypt(newUser.id.toString()) },
        });
      } else {
        res.status(200).json({ success: false, message: "email existed." });
      }
    } else {
      res
        .status(200)
        .json({ success: false, message: "email or password not valid." });
    }
  } else {
    res
      .status(200)
      .json({ success: false, message: "email or code not valid." });
  }
});

router.post("/reset", async (req: Request, res: Response) => {
  const email = req.body["email"];
  const password = req.body["password"];
  const code = req.body["code"];

  var emails = await db.searchEmail(req, email);
  console.log(emails);
  if (
    emails &&
    emails[0] &&
    emails[0].code == code &&
    emails[0].codeExpiredAt > new Date()
  ) {
    if (email && isValidEmail(email) && password) {
      var user = await db.getUserByEmail(req, email);
      if (email && password && user) {
        user.password = Md5.hashStr(password);
        var result = await db.updateUser(req, user);
        res.status(200).json({
          success: true,
          message: "user password updated",
          data: { key: encrypt(user.id.toString()) },
        });
      } else {
        res.status(200).json({ success: false, message: "email not existed." });
      }
    } else {
      res
        .status(200)
        .json({ success: false, message: "email or password not valid." });
    }
  } else {
    res
      .status(200)
      .json({ success: false, message: "email or code not valid." });
  }
});

router.put("/user", async (req: Request, res: Response) => {
  const key = req.get("key");

  if (key) {
    const id = decrypt(key);
    console.log("decrypt");
    console.log(id);

    const points = +req.body["points"];
    const trackId = +req.body["track_id"];
    const avatar = req.body["avatar"] as string;
    const username = req.body["username"] as string;
    const productId = req.body["productId"] as string;
    const purchaseTime = req.body["purchaseTime"] as Date;
    const purchaseToken = req.body["purchaseToken"] as string;
    var userToUpdate = await db.getUserById(req, id);
    console.log(userToUpdate);
    console.log(trackId);
    if (userToUpdate) {
      userToUpdate.avatar = avatar; // undefined means "do nothing" so empty param can be passed on will not update the data
      userToUpdate.username = username;
      userToUpdate.productId = productId;
      userToUpdate.purchaseTime = new Date(purchaseTime);
      userToUpdate.purchaseToken = purchaseToken;
      /**
 * {
  "acknowledged": false,
  "autoRenewing": true,
  "orderId": "GPA.3304-2015-5247-97560",
  "packageName": "com.mlin74.hiajoymobile",
  "productId": "com.hiajoy.yearly",
  "purchaseState": 0,
  "purchaseTime": 1744317686350,
  "purchaseToken": "indfdgbdibmdpdgbddpblhlh.AO-J1Oye24qv1Zpfjga0Bega73PD9s7qc4TfxclwZZTTxi4dsp4US73X3EUrV9fJLGWLRUmB-jpTf1dXc080pXpmfJFu1nSqRp0EyuuvCv1EzN7uEwDGGFc",
  "quantity": 1
}
 * 
 * 
 */

      if (
        productId &&
        purchaseToken != userToUpdate.profile.mobilePurchaseToken
      ) {
        var current: Date = userToUpdate.expiredAt ?? new Date();
        current = current < new Date() ? new Date() : current;
        console.log(current);
        console.log(productId);
        current.setDate(
          current.getDate() + (productId == "com.hiajoy.yearly" ? 366 : 31)
        );
        console.log(productId == "com.hiajoy.yearly" ? 366 : 31);
        userToUpdate.expiredAt = current;
      }

      Number.isNaN(points)
        ? (userToUpdate.points = userToUpdate.profile.points)
        : (userToUpdate.points = points);
      Number.isNaN(trackId)
        ? (userToUpdate.affirmTrackId = userToUpdate.profile.affirmTrackId)
        : (userToUpdate.affirmTrackId = trackId);
      var result = await db.updateUser(req, userToUpdate);
      if (result) {
        res.status(200).json({
          success: true,
          message: "user updated",
          data: result,
        });
        return;
      } else {
        res
          .status(200)
          .json({ success: false, message: "user update failed." });
        return;
      }
    } else {
      res.status(200).json({ success: false, message: "user not found." });
      return;
    }
  } else {
    res.status(200).json({ success: false, message: "access key not valid." });
    return;
  }
});

router.delete("/user", async (req: Request, res: Response) => {
  const key = req.get("key");

  if (key) {
    const id = decrypt(key);
    if (id) {
      const result = await db.deleteUser(req, id);

      result
        ? res.status(200).json({ success: true, message: "deleted" })
        : res
            .status(200)
            .json({ success: false, message: "no record deleted" });
    } else {
      res
        .status(200)
        .json({ success: false, message: "access key not valid." });
    }
  } else
    res.status(200).json({ success: false, message: "access key not valid." });
});

router.put("/user/points", async (req: Request, res: Response) => {
  const key = req.get("key");

  if (key) {
    const id = decrypt(key);
    const points = +req.body["increment"];
    var result = await db.pointsIncrement(req, id, points);
    console.log(result);
    if (result && result.profile) {
      res.status(200).json({
        success: true,
        message: "user points updated",
        data: { points: result.profile.points },
      });
    } else {
      res
        .status(200)
        .json({ success: false, message: "user points update failed." });
    }
  } else {
    res.status(200).json({ success: false, message: "user not found." });
  }
});

router.put("/user/affirmation", async (req: Request, res: Response) => {
  const key = req.get("key");

  if (key) {
    const id = decrypt(key);
    const track_id = +req.body["track_id"];
    var result = await db.updateAffirmationTrackId(req, id, track_id);
    console.log(result);
    if (result && result.profile) {
      res.status(200).json({
        success: true,
        message: "user affirmation updated",
        data: { affirmTrackId: result.profile.affirmTrackId },
      });
    } else {
      res
        .status(200)
        .json({ success: false, message: "user affirmation update failed." });
    }
  } else {
    res.status(200).json({ success: false, message: "user not found." });
  }
});

module.exports = router;
