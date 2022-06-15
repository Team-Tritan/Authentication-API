"use strict";

import express from "express";
import * as config from "./config";
import Router from "./routes/router";

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", Router);

app.listen(config.server.port, () => {
  console.log(
    `[AUTH SERVER] Listening on http://0.0.0.0:${config.server.port}/`
  );
});
