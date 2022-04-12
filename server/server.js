"use strict";

const express = require("express");
const morgan = require("morgan");
const {
  getUsers,
  createUser,
  logInUser,
  addToWatchLater,
  addReview,
} = require("./handler");
const PORT = 8000;

express()
  .use(morgan("tiny"))
  .use(express.json())

  .use(express.static("public"))

  .get("/api/users", getUsers)
  .post("/api/user", createUser)
  .post("/api/login", logInUser)
  .put("/api/review", addReview)
  .put("/api/watchlater", addToWatchLater)

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
