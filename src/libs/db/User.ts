"use strict";

import mongoose from "mongoose";

const User = new mongoose.Schema({
  username: {
    type: String,
    required: false,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        );
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 64,
  },
  firstName: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 64,
  },
  lastName: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 64,
  },
  metadata: {},
});

export default mongoose.model("Users", User, "Users");
