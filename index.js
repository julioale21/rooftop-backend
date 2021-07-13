"use strict";
exports.__esModule = true;
var express = require("express");
var fs_1 = require("fs");
var app = express();
function authorization(req, res, next) {
    if (req.headers.authorization) {
        if (req.headers.authorization === "Bearer 65a83e72c7e990a3e6565ae8b7cc071c") {
            next();
        }
        else {
            res.status(403).json("Forbidden");
        }
    }
    else {
        res.status(403).json('No token provided');
    }
}
function log(req, res, next) {
    var today = new Date();
    var fileName = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate() + ".log";
    console.log(req.url);
    var message = {
        ip: req.params.ip,
        date: today,
        method: req.method + ", url: '" + req.url + "'"
    };
    fs_1.writeFileSync(fileName, JSON.stringify(message));
    next();
}
app.use(log);
app.use(authorization);
app.get("/", function (req, res) {
    res.send("Bienvenido");
});
app.listen(5000, function () {
    console.log("app listen on port 5000");
});
