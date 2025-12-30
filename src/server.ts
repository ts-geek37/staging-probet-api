import express from "express";

const server = express();

server.use(express.json());

server.get("/", (_, res) => {
  res.status(200).json({ status: "ok" });
});

export default server;
