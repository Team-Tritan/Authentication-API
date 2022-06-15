import { Router, Request, Response } from "express";

const route = Router();

// All Route Metadata
route.use("*", (_req: Request, _res: Response, next) => {
  _res.header("daddy", "pound me harder");
  _res.header("x-powered-by", "yo fat ass cock");
  _res.header("server", "ur mom");

  next();
});

export default route;
