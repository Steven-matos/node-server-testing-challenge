const express = require("express");
const helmet = require("helmet");

const server = express();

const carRouter = require("../cars/carsRouter");

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.use("/api/car", carRouter);

module.exports = server;
