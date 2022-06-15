"use strict";

import User from "./User";

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
export async function createUser(
  username,
  email,
  password,
  firstName,
  lastName
) {
  await new User({
    username: username,
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  })
    .save()
    .catch((err) => {
      console.error(`[AUTH SERVER] CREATE USER ERROR --> `, err);
      throw new Error(err);
    });

  let data = await User.findOne({ email: email });
  return data;
}
