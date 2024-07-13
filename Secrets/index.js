import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

var correct = false;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function passwordCheck(req, res, next) {
  const password = req.body["password"];
  if (password === "ILoveProgramming") {
    correct = true;
  }
  next();
});

app.post("/check", (req, res) => {
  if (correct === true) {
    res.sendFile(__dirname + "/public/secret.html");
    correct = false;
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});