"use strict";

import { Router, Request, Response } from "express";
import User from "../../libs/db/User";
import * as functions from "../../utils/functions";

let route = Router();

interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  metadata: {};
}

route
  .post("/", async (_req: Request, _res: Response) => {
    let { email, password, firstName, lastName, metadata } = _req.body;

    const emailExists = await User.find({ email: email });

    if (emailExists.length > 0) {
      console.log(
        "[AUTH SERVER] REGISTER FAILURE --> Email already exists.",
        emailExists
      );

      return _res.status(400).json({
        message: "BAD REQUEST: Email already exists.",
        error: true,
        status: 400,
      });
    }

    let passwordHash = await functions.encryptPassword(password);

    let data = await functions.createUser(
      //username,
      email,
      passwordHash,
      firstName,
      lastName,
      metadata
    );

    console.log("[AUTH SERVER] REGISTER SUCCESS --> ", data);

    return _res.status(200).json(data);
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
