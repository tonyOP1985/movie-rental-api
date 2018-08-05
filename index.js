const config = require("config");
const express = require("express");
const Joi = require("joi");
Joi.objectID = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const authenticating = require("./authenticate");
const debug = require("debug")("app:startup");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not define.");
  process.exit(1);
}

const app = express();

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to Mongodb..."))
  .catch(err => console.error("Unable to connect to Mongodb..."));

// app.set("view engine", "pug");

app.use(express.json()); // req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled"); // console.log
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
