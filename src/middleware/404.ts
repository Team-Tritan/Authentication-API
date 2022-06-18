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
    request: {
      method: _req.method,
      body: _req.body,
      url: _req.originalUrl,
      params: _req.params,
      query: _req.query,
      headers: _req.headers,
      cookies: _req.cookies,
      fresh: _req.fresh,
      xhr: _req.xhr,
      protocol: _req.protocol,
    },
  };

  return _res.json(data);
});

export default route;
