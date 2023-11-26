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

app.get("/api/get-balance", async (req: Request, res: Response) => {
  try {
    const result = await db.query(
      "SELECT balance FROM finbalance WHERE id = 1"
    );
    const balance = result.rows[0].balance;
    res.json({ balance });
  } catch (error) {
    console.error("Error fetching balance: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/update-balance", async (req: Request, res: Response) => {
  const { userBalance } = req.body;
  console.log(userBalance);
  res.json(userBalance);
  try {
    // const insertQuery = "INSERT INTO finbalance (balance) Values ($1) ";
    // await db.query(insertQuery, [userBalance]);
    const updateQuery = "UPDATE finbalance SET balance=$1 WHERE id =1";
    await db.query(updateQuery, [userBalance]);
    // res.status(201).json({ message: "Balance updated successfully" });
  } catch (error) {
    console.error("Error updating balance: ", error);
  }
});

app.post("/api/update-field", async(req: Request, res: Response) => {
  const { fields, data} = req.body;
  console.log(req.body);
  
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
