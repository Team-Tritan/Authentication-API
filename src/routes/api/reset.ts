"use strict";

import { Router, Request, Response } from "express";
import User from "../../libs/db/User";
import * as config from "../../config";
import * as functions from "../../utils/functions";

const route = Router();

interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  metadata: {};
}

route
  .post("/", async (_req: Request, _res: Response) => {
    // Check auth header
    const auth = _req.headers.authorization;

    if (!auth) {
      return _res.status(401).json({
        error: true,
        code: 401,
        message: "No authorization token provided.",
      });
    }

    if (auth !== config.tokens.frontend_key) {
      return _res.status(401).json({
        error: true,
        code: 401,
        message: "Invalid authorization token provided.",
      });
    }

    let { email, password } = _req.body;

    if (!email || !password) {
      return _res.status(400).json({
        message: "BAD REQUEST: Login failed, missing required fields.",
        error: true,
        status: 400,
      });
    }

    let user = await User.findOne({ email: email });

    if (!user) {
      return _res.status(400).json({
        message: "BAD REQUEST: Login failed, user not found.",
        error: true,
        status: 400,
      });
    }

    let newHash = await functions.encryptPassword(password);
    try {
      await user.updateOne({ password: newHash });
    } catch (err) {
      console.log("[AUTH SERVER] RESET PASSWORD FAILURE --> ", err);
      return _res.status(500).json({
        message: "INTERNAL SERVER ERROR: Password hash validation error.",
        error: true,
        status: 500,
      });
    }

    console.log("[AUTH SERVER] RESET PASSWORD SUCCESS --> ", user);
    return _res.status(200).json({
      message: "Password reset successfully",
      error: false,
      status: 200,
    });
  })

  // Not allowed methods
  .all("/", (_req: Request, _res: Response) => {
    return _res.status(405).json({
      message: "Method not allowed",
      error: true,
      status: 405,
    });
  });

export default route;
