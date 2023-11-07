"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg = require("pg");
var Client = pg.Client;
var client = new Client({
    host: "localhost",
    user: "postgres",
    password: "206001",
    database: "postgres",
    port: 5432,
});
client
    .connect()
    .then(function () {
    console.log("Connected to Postgresql");
})
    .catch(function (error) {
    console.error("Error connecting to Postgresql", error);
});
