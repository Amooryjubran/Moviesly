"use strict";

const express = require("express");
const morgan = require("morgan");
const {
  getUsers,
  getUser,
  createUser,
  logInUser,
  addToWatchLater,
  addToWatched,
  addReview,
  getReviews,
  addLike,
  getLike,
  addGenres,
  addProfileImg,
  newsletter,
  addReply,
} = require("./handler");

express()
  .use(morgan("dev"))
  .use(express.json())

  .use(express.static("public"))

  .get("/api/users", getUsers)
  .get("/api/user/:profile", getUser)
  .get("/api/reviews", getReviews)
  .post("/api/user", createUser)
  .post("/api/login", logInUser)
  .post("/api/review", addReview)
  .post("/api/reply", addReply)
  .post("/api/like", addLike)
  .post("/api/newsletter", newsletter)
  .put("/api/watchlater", addToWatchLater)
  .put("/api/watched", addToWatched)
  .put("/api/genres", addGenres)
  .put("/api/like", getLike)
  .put("/api/profileImg", addProfileImg)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "ERROR FROM SERVER",
    });
  })
  .get("/HelloWorld", (req, res) =>
    res.status(200).json("I'm the next Mark Zuckerbung")
  )

  .listen(process.env.PORT || 8000, () =>
    console.info(`Listening on port ${PORT}`)
  );
