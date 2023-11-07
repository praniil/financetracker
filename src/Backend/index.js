"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var port = 8080;
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(bodyParser.json());
app.get("/api/update-balance", function (req, res) {
    res.send("Hello World");
});
app.post("/api/update-balance", function (req, res) {
    var requestBody = req.body;
    console.log(requestBody);
    res.json({ requestBody: requestBody });
});
app.listen(port, function () {
    console.log("App listening on port ".concat(port));
});
