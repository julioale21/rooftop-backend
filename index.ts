import * as express from "express";

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

app.use(authorization);

app.get("/", function(req, res) {
  res.send("Bienvenido")
})

app.listen(5000, function() {
  console.log("app listen on port 5000")
})