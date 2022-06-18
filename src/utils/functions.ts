"use strict";

import User from "../libs/db/User";
import bcrypt from "bcrypt";

/**
 * Get User by Username
 * @param username - username of the user
 * @returns Object
 */
export async function getUserByUsername(username) {
  let data = await User.findOne({ username: username });
  return data;
}

/**
 * Get User by Email
 * @param email - email of the user
 * @returns Object
 */
export async function getUserByEmail(email) {
  let data = await User.findOne({ email: email });
  return data;
}

/**
 * Get User by ID
 * @param id - id of the user
 * @returns Object
 */
export async function getUserById(id) {
  let data = await User.findById(id);
  return data;
}

/**
 * Get user by username or email
 * @param usernameOrEmail - Get username or email of the user
 * @returns Object
 */
export async function getUserByUsernameOrEmail(usernameOrEmail) {
  let data = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });
  return data;
}

/**
 * Create user in database
 * @param email - email of the user
 * @param password - password of the user
 * @param firstName - first name of the user
 * @param lastName - last name of the user
 * @param metadata - metadata of the user
 * @returns
 */
export async function createUser(
  email,
  password,
  firstName,
  lastName,
  metadata
) {
  await new User({
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    metadata: metadata,
  })
    .save()
    .catch((err) => {
      console.error(`[AUTH SERVER] CREATE USER ERROR --> `, err);
      throw new Error(err);
    });

  let data = await User.findOne({ email: email });
  return data;
}

/**
 * Encrypt password
 * @param password - password of the user
 * @returns  hash of the password
 */
export async function encryptPassword(password) {
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);
  return hash;
}
