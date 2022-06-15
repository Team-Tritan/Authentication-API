"use strict";

import express from "express";
import { config } from "./config";
import Router from "./routes/router";

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", Router);

app.listen(config.port, () => {
  console.log(`[SERVER] Listening on http://0.0.0.0:${config.port}/`);
});
