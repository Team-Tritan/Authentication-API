import { Router, Request, Response } from "express";
import * as config from "../../config";

const route = Router();

// 500 Handling
route.use("*", (_req: Request, _res: Response, _error: any) => {
  console.error(_error);

  let data = {
    message: "Internal Server Error",
    error: true,
    status: _res.status || 500,
    stacktrace: _error,
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

  return _res.status(500).json(data);
});

export default route;
