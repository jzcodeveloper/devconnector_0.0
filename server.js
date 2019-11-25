const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const responseTime = require("response-time");

const app = express();

//Connect DB
connectDB();

//Init Middlewares
app.use(responseTime());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));

//Define routes
app.use("/api", require("./routes"));

// Set static folder
app.use(express.static(path.resolve(__dirname, "./public")));
//Always renders index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
