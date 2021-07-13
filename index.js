"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
function authorization(req, res, next) {
    if (req.headers.authorization) {
        if (req.headers.authorization === "Bearer 65a83e72c7e990a3e6565ae8b7cc071c") {
            next();
        }
        else {
            res.status(403).send("Forbidden");
        }
        res.status(400).send("Bad request. Must provided authorization token");
    }
}
app.use(authorization);
app.get("/", function (req, res) {
    res.send("Bienvenido");
});
app.listen(5000, function () {
    console.log("app listen on port 5000");
});
