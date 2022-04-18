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
    return result
      ? res.status(200).json({ status: 200, data: result, message: "success" })
      : res.status(409).json({ status: 409, message: "ERROR" });
  } catch (err) {
    console.log("Error getting list of users", err);
    return res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};
const getUser = async (req, res) => {
  const _id = req.params.profile;
  try {
    await client.connect();
    const db = client.db("Movieslify");
    const user = await db.collection("users").findOne({ _id });
    user
      ? res.status(200).json({ status: 200, data: user })
      : res.status(404).json({ status: 404, data: "User Not Found" });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const getReviews = async (req, res) => {
  try {
    await client.connect();
    const db = client.db("Movieslify");
    const result = await db.collection("reviews").find().toArray();
    return result
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
    reviews: [],
    likes: [],
    profileImg: [],
    timeStamp: new Date().toISOString(),
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
    return users
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
            reviews: userArray.reviews,
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
const addToWatched = async (req, res) => {
  const { email, watched } = req.body;
  try {
    await client.connect();
    const db = client.db("Movieslify");
    const emailUsers = await db.collection("users").findOne({ email });

    if (emailUsers) {
      const result = await db.collection("users").updateOne(
        { email },
        {
          $set: {
            watched,
          },
        }
      );

      console.log(watched);
      return res.status(200).json({
        status: 200,
        message: `watched array is updated`,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: `Not able to add watched array to database, user not found`,
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const addGenres = async (req, res) => {
  const { email, favoriteGenres } = req.body;
  try {
    await client.connect();
    const db = client.db("Movieslify");
    const emailUsers = await db.collection("users").findOne({ email });

    if (emailUsers) {
      const result = await db.collection("users").updateOne(
        { email },
        {
          $set: {
            favoriteGenres,
          },
        }
      );

      console.log(result);
      return res.status(200).json({
        status: 200,
        message: `Genres Updated`,
        data: result,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: `Not able to add genres to database, user not found`,
        data: result,
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};
const addReview = async (req, res) => {
  const { email, movieId, review, rating } = req.body;
  const userArray = {
    _id: uuidv4(),
    email: email,
    movieId: movieId,
    review: review,
    likes: [],
    replys: [],
    rating: rating,
    timeStamp: new Date().toISOString(),
  };

  try {
    await client.connect();
    const db = client.db("Movieslify");
    const emailUsers = await db.collection("users").findOne({ email });
    if (!email || !movieId || !review || !rating) {
      return res
        .status(409)
        .json({ status: 409, message: "Please complete your form" });
    }
    if (emailUsers) {
      await db.collection("reviews").insertOne(userArray);
      res.status(200).json({
        status: 200,
        message: `Review is added`,
        data: userArray,
      });
      await db.collection("users").updateOne(
        { email },
        {
          $push: {
            reviews: userArray._id,
          },
        }
      );
    } else {
      return res.status(400).json({
        status: 400,
        message: `Not able to add your review to database, user not found`,
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const addLike = async (req, res) => {
  const { email, likes } = req.body;
  try {
    await client.connect();
    const db = client.db("Movieslify");
    const emailUsers = await db.collection("users").findOne({ email });
    if (emailUsers) {
      const review = await db.collection("reviews").findOneAndUpdate(
        { email },
        {
          $push: {
            likes: likes,
          },
        }
      );
      await db.collection("users").updateOne(
        { email },
        {
          $push: {
            likes: review.value._id,
          },
        }
      );
    } else {
      return res.status(400).json({
        status: 400,
        message: `Not able to add your like to database, user not found`,
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};
const getLike = async (req, res) => {
  const { likes } = req.body;
  try {
    await client.connect();
    const db = client.db("Movieslify");
    const users = await db
      .collection("users")
      .find({
        email: { $in: likes },
      })
      .toArray();
    return res.status(200).json({ status: 200, data: users, message: "ok" });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};
const addProfileImg = async (req, res) => {
  const { email, profileImg } = req.body;
  try {
    await client.connect();
    const db = client.db("Movieslify");
    const emailUsers = await db.collection("users").findOne({ email });

    if (emailUsers) {
      const result = await db.collection("users").updateOne(
        { email },
        {
          $set: {
            profileImg,
          },
        }
      );

      console.log(result);
      return res.status(200).json({
        status: 200,
        message: `Profile picture updated`,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: `Not able to add your profile picture`,
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};
const newsletter = async (req, res) => {
  const { email } = req.body;
  const newsLetterObject = {
    _id: uuidv4(),
    email,
  };
  try {
    await client.connect();
    const db = client.db("Movieslify");
    const newsletter = await db
      .collection("newsletter")
      .insertOne(newsLetterObject);
    return newsletter
      ? res.status(200).json({
          status: 200,
          data: newsLetterObject,
          message: "email is added to the newsLetter",
        })
      : res
          .status(400)
          .json({ status: 400, data: newsLetterObject, message: "error" });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};
module.exports = {
  getUsers,
  getUser,
  getReviews,
  createUser,
  logInUser,
  addToWatchLater,
  addReview,
  addLike,
  getLike,
  addGenres,
  addProfileImg,
  addToWatched,
  newsletter,
};
