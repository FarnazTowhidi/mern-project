const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cors = require("cors");
const fileupload = require("express-fileupload");
require("dotenv").config();
require("./config/database");

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(fileupload());
app.use(logger("dev"));
app.use(express.json());
// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
//app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));
// Middleware to verify token and assign user object of payload to req.user.
// Be sure to mount before routes
app.use(require("./config/checkToken"));

// routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/chats", require("./routes/api/chats"));
app.use("/api/messages", require("./routes/api/messages"));

const server = app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
require("./socket/socket").init(server);

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});


