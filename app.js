const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const corc = require("cors");
const morgan = require("morgan");

const userRoutes = require("./routes/user");
const postsRoutes = require("./routes/posts");
const tagsRoutes = require("./routes/tags");

const app = express();

mongoose.connect('mongodb://localhost:27017/blog')
.then(() => console.log('DB connected'))
.catch(error => console.log(error))

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use(corc());

app.use("/api/auth", userRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/tags", tagsRoutes);

app.get('*', (req, res) => res.status(404).send('Oops, this is an invalid URL'))

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist/bootcamp"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client", "dist", "bootcamp", "index.html")
    );
  });
}

module.exports = app;
