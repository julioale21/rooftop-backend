import * as express from "express";
import { writeFileSync } from "fs";

const app = express();

function authorization(req, res, next) {
  if (req.headers.authorization) {
    if (req.headers.authorization === "Bearer 65a83e72c7e990a3e6565ae8b7cc071c") {
      next()
    } else {
      res.status(403).json("Forbidden")
    }
    
  } else {
    res.status(403).json('No token provided');
  }
}

function log(req, res, next) {
  const today = new Date();
  const fileName = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate() + ".log"
  console.log(req.url)
  const message = `${req.params.ip}, ${today.toString()}, ${req.method}, ${req.url}`

  writeFileSync(fileName, message)

  next();
}

app.use(log);

app.use(authorization);

app.get("/", function(req, res) {
  res.send("Bienvenido")
})

app.listen(5000, function() {
  console.log("app listen on port 5000")
})