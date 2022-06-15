import { Router, Request, Response } from "express";
import { config } from "../../config";

const route = Router();

route

  // Allowed method
  .get("/", (_req: Request, _res: Response) => {
    return _res.status(200).json({
      message: "Tritan Development: Internal Authentication API",
      version: config.version,
      mode: config.production ? "production" : "development",
      error: false,
      status: 200,
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
    });
  })

  // Not allowed methods
  .all("/", (_req: Request, _res: Response) => {
    return _res.status(405).json({
      message: "Method not allowed",
      error: true,
      status: _res.status || 405,
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
    });
  });

export default route;
