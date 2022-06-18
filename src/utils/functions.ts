"use strict";

import User from "../libs/db/User";
import bcrypt from "bcrypt";

export async function getUserByUsername(username) {
  let data = await User.findOne({ username: username });
  return data;
}
export async function getUserByEmail(email) {
  let data = await User.findOne({ email: email });
  return data;
}
export async function getUserById(id) {
  let data = await User.findById(id);
  return data;
}
export async function getUserByUsernameOrEmail(usernameOrEmail) {
  let data = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });
  return data;
}

// Create a new user
export async function createUser(email, password, firstName, lastName) {
  await new User({
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    metadata: {},
  })
    .save()
    .catch((err) => {
      console.error(`[AUTH SERVER] CREATE USER ERROR --> `, err);
      throw new Error(err);
    });

  let data = await User.findOne({ email: email });
  return data;
}

// Encrypt password for store
export async function encryptPassword(password) {
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);
  return hash;
}
