import * as pg from "pg";
const { Client } = pg;
const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "206001",
  database: "postgres",
  port: 5432,
});

client
  .connect()
  .then(() => {
    console.log("Connected to Postgresql");
  })
  .catch((error) => {
    console.error("Error connecting to Postgresql", error);
  });

module.exports(Client);
