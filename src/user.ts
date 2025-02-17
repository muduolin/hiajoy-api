import express, { Request, Response } from "express";
import { isValidEmail } from "./lib/util";
import { Md5 } from "ts-md5";
import { jwtDecode } from "jwt-decode";
import * as db from "./db";
import { encrypt, decrypt } from "./lib/security";

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
    var result = await fetch(
      "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + token
    );
    googleUser = (await result.json()) as GoogleUser;
    userEmail = googleUser.email;
    //console.log(googleUser)
  } else if (provider == "apple" && token) {
    // after apple auth, pass the token to decode
    type AppleUser = {
      email: string;
    };

    const decoded = jwtDecode<AppleUser>(token);
    userEmail = decoded.email;
    //console.log(decoded)
  }
  //console.log(userEmail);
  if (userEmail) {
    var user = await db.getUserByEmail(req, userEmail);

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
          key: encrypt(user.id.toString()),
        },
      });
    } else if (!user && token) {
      await db.createUser(req, userEmail, "clear-useless", provider);
      var userResult = await db.getUserByEmail(req, userEmail);

      if (userResult && googleUser && provider == "google") {
        userResult.avatar = googleUser.picture;
        userResult.username = googleUser.name;

        await db.updateUser(req, userResult);
      }

      userResult = await db.getUserByEmail(req, userEmail);
      if (userResult) {
        res.status(200).json({
          success: true,
          data: {
            isLogin: true,
            isPremium: false,
            createdAt: userResult.createdAt,
            lastActiveAt: userResult.lastActiveAt,
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

  if (email && isValidEmail(email) && password) {
    var rowCount = await db.createUser(req, email, Md5.hashStr(password));
    var user = await db.getUserByEmail(req, email);
    if (rowCount && user) {
      res.status(200).json({
        success: true,
        message: "user registered",
        data: { key: encrypt(user.id.toString()) },
      });
    } else {
      res.status(200).json({ success: false, message: "email existed." });
    }
  } else {
    res
      .status(200)
      .json({ success: false, message: "email or password not valid." });
  }
});

router.put("/user", async (req: Request, res: Response) => {
  const key = req.get("key");

  if (key) {
    const id = +decrypt(key);
    console.log(id);
    const avatar = req.body["avatar"] as string;
    var userToUpdate = await db.getUserById(req, +id);
    if (userToUpdate) {
      userToUpdate.avatar = avatar;
      var result = await db.updateUser(req, userToUpdate);
      if (result) {
        res.status(200).json({
          success: true,
          message: "user updated",
        });
      } else {
        res
          .status(200)
          .json({ success: false, message: "user update failed." });
      }
    } else {
      res.status(200).json({ success: false, message: "user not found." });
    }
  } else {
    res.status(200).json({ success: false, message: "access key not valid." });
  }
});

router.delete("/user", async (req: Request, res: Response) => {
  const key = req.get("key");

  if (key) {
    const id = +decrypt(key);
    if (id) {
      const result = await db.deleteUser(req, id);
      
      result?res.status(200).json({ success: true, message: "deleted" }):
      res.status(200).json({ success: false, message: "no record deleted" });
    } else {
      res
        .status(200)
        .json({ success: false, message: "access key not valid." });
    }
  } else
    res.status(200).json({ success: false, message: "access key not valid." });
});

module.exports = router;
