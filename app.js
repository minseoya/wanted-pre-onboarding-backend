require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const router = require("./src/routers/index");

const { globalErrorHandler } = require("./src/utils/errors");

const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(morgan("tiny"));
  app.use(express.json());

  app.use(router);

  app.get("/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
  });

  app.all("*", (req, res, next) => {
    const err = new Error(`Can't fine ${req.originalUrl} on this server!`);

    err.statusCode = 404;
    next(err);
  });

  app.use(globalErrorHandler);

  return app;
};

module.exports = { createApp };
