"use strict";

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, option);

const getUsers = async (req, res) => {
  try {
    await client.connect();
    const db = client.db("Movieslify");
    const result = await db.collection("users").find().toArray();
    result
      ? res.status(200).json({ status: 200, data: result, message: "success" })
      : res.status(409).json({ status: 409, message: "ERROR" });
  } catch (err) {
    console.log("Error getting list of users", err);
    res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

const logInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    await client.connect();
    const db = client.db("Movieslify");
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: 400, message: "Add your email and password" });
    }
    const loginAuth = await db.collection("users").findOne({ email });
    if (loginAuth) {
      const loginPassword = await bcrypt.compare(password, loginAuth.password);
      if (loginPassword) {
        const {
          _id,
          firstName,
          lastName,
          email,
          favoriteGenres,
          watched,
          premiumMember,
          watchLater,
        } = loginAuth;

        return res.status(200).json({
          status: 200,
          message: "User Logged In",
          data: {
            _id,
            firstName,
            lastName,
            email,
            favoriteGenres,
            watched,
            premiumMember,
            watchLater,
          },
        });
      } else
        return res
          .status(409)
          .json({ status: 409, message: "Passwords don't match" });
    } else
      return res.status(400).json({ status: 400, message: "E-mail not found" });
  } catch (err) {
    console.log("error", err);
  } finally {
    client.close();
  }
};

const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const userArray = {
    _id: uuidv4(),
    firstName,
    lastName,
    email,
    password,
    favoriteGenres: [],
    watched: [],
    watchLater: [],
    premiumMember: false,
  };
  try {
    await client.connect();
    const db = client.db("Movieslify");
    const emailUsers = await db.collection("users").findOne({ email });
    const emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailValidation.test(email)) {
      return res
        .status(400)
        .json({ status: 400, message: "E-mail isn't valid" });
    }
    if (!email || !password || !firstName || !lastName) {
      return res
        .status(409)
        .json({ status: 409, message: "Add your credentials" });
    }
    if (emailUsers) {
      return res
        .status(403)
        .json({ status: 403, message: "User already exists" });
    }
    const cryptedPassword = await bcrypt.hash(password, 10);
    userArray.password = cryptedPassword;
    const users = await db.collection("users").insertOne(userArray);
    users
      ? res.status(200).json({
          status: 200,
          data: {
            _id: userArray._id,
            firstName,
            lastName,
            email,
            favoriteGenres: userArray.favoriteGenres,
            watched: userArray.watched,
            watchLater: userArray.watchLater,
            premiumMember: userArray.premiumMember,
          },
          message: "User Created",
        })
      : res.status(409).json({ status: 409, message: "ERROR" });
  } catch (err) {
    console.log("error", err);
  } finally {
    client.close();
  }
};
const addToWatchLater = async (req, res) => {
  const client = new MongoClient(MONGO_URI, option);
  const { email, watchLater } = req.body;
  try {
    await client.connect();
    const db = client.db("Movieslify");
    const emailUsers = await db.collection("users").findOne({ email });

    if (emailUsers) {
      const result = await db.collection("users").updateOne(
        { email },
        {
          $set: {
            watchLater,
          },
        }
      );

      console.log(result);
      return res.status(200).json({
        status: 200,
        message: `watch later updated`,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: `Not able to add Watch later to database, user not found`,
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};
module.exports = {
  getUsers,
  createUser,
  logInUser,
  addToWatchLater,
};
