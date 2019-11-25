const express = require("express");
const app = express();

//Routes
app.use("/users", require("./users"));
app.use("/profile", require("./profile"));
app.use("/posts", require("./posts"));

module.exports = app;
