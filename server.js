"use strict";

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");

const { router: usersRouter } = require("./users");
const { router: authRouter, localStrategy, jwtStrategy } = require("./auth");
const animalRouter = require("./animals/routers/animal-router");
const behaviorRouter = require("./animals/routers/behavior-router");
const assessmentRouter = require("./animals/routers/assessment-router");

const { PORT, DATABASE_URL, CLIENT_ORIGIN } = require("./config");

const app = express();
mongoose.Promise = global.Promise;

// Logging
app.use(morgan("common"));

// CORS
app.use(
  cors({
      origin: CLIENT_ORIGIN
  })
);

//  MIDDLEWARE
app.use(bodyParser.json());
passport.use(localStrategy);
passport.use(jwtStrategy);

// ROUTES
app.use("/api/users/", usersRouter);
app.use("/api/auth/", authRouter);
app.use("/animal/", animalRouter);
app.use("/behavior/", behaviorRouter);
app.use("/assessment/", assessmentRouter);

const jwtAuth = passport.authenticate("jwt", { session: false });

// A protected endpoint which needs a valid JWT to access it
app.get("/api/protected", jwtAuth, (req, res) => {
  return res.json({
    data: "rosebud"
  });
});

app.use("*", (req, res) => {
  return res.status(404).json({ message: "Not Found" });
});

// Referenced by both runServer and closeServer. closeServer
// assumes runServer has run and set `server` to a server object
let server;

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, { useMongoClient: true }, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(PORT, () => {
          console.log(`Your app is listening on port ${PORT}`);
          resolve();
        })
        .on("error", err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
