import * as pg from "pg";
const { Client } = pg;
const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "206001",
  database: "postgres",
  port: 5432,
});
