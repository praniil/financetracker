const express = require("express");
const cors = require("cors");

import { Request, Response, response } from "express";
const bodyParser = require("body-parser");
import db from "./Database/database";
const app = express();
const port = 8080;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());

app.get("/api/update-balance", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.post("/api/update-balance", (req: Request, res: Response) => {
  const requestBody = req.body;
  console.log(requestBody);
  res.json({ requestBody });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
