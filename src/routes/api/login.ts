"use strict";

import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../../libs/mongoose/User";

let route = Router();

route
  .post("/", async (_req: Request, _res: Response) => {
    let { email, password } = _req.body;

    if (!email || !password) {
      return _res.status(400).json({
        message: "BAD REQUEST: Login failed, missing required fields.",
        error: true,
        status: 400,
      });
    }

    let _user = await User.findOne({ email: email });
    let hash = _user.password;

    await bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        console.log("[AUTH SERVER] LOGIN FAILURE --> ", err);

        return _res.status(500).json({
          message: "INTERNAL SERVER ERROR: Password hash validation error.",
          error: true,
          status: 500,
        });
      }

      if (result) {
        console.log("[AUTH SERVER] LOGIN SUCCESS --> ", _user);
        return _res.status(200).json({
          message: "Authenticated Successfully",
          code: 200,
          error: false,
          user: _user,
        });
      }

      if (!result) {
        console.log("[AUTH SERVER] LOGIN SUCCESS --> ", _user);
        return _res.status(400).json({
          message: "Incorrect password",
          error: true,
          status: 400,
        });
      }
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
