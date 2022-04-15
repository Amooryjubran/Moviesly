"use strict";

const express = require("express");
const morgan = require("morgan");
const {
  getUsers,
  getUser,
  createUser,
  logInUser,
  addToWatchLater,
  addReview,
  getReviews,
  addLike,
  getLike,
} = require("./handler");
const PORT = 8000;

express()
  .use(morgan("tiny"))
  .use(express.json())

  .use(express.static("public"))

  .get("/api/users", getUsers)
  .get("/api/user/:profile", getUser)
  .get("/api/reviews", getReviews)
  .post("/api/user", createUser)
  .post("/api/login", logInUser)
  .post("/api/review", addReview)
  .post("/api/like", addLike)
  .put("/api/watchlater", addToWatchLater)
  .put("/api/like", getLike)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "ERROR FROM SERVER",
    });
  })
  .get("/HelloWorld", (req, res) =>
    res.status(200).json("I'm the next Mark Zuckerbung")
  )

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
