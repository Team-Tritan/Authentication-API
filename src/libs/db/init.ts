"use strict";

import mongoose from "mongoose";
import * as config from "../../config";

async function DatabaseConnection() {
  await mongoose
    .connect(config.tokens.mongo)
    .then(() => {
      console.log(
        `[AUTH SERVER] EVENT --> Mongoose connected to ${config.tokens.mongo}`
      );
    })
    .catch((err) => {
      console.error(`[AUTH SERVER] MONGOOSE ERROR --> `, err);
    });
}
export default DatabaseConnection;
