import { Router, Request, Response } from "express";
import * as config from "../config";

const route = Router();

// 404 Handling
route.use("*", (_req: Request, _res: Response) => {
  let data = {
    message: "The requested content could not be found on this server.",
    error: true,
    status: _res.status || 500,
    version: config.server.version,
    mode: config.server.production ? "production" : "development",
  };

  return _res.json(data);
});

export default route;
