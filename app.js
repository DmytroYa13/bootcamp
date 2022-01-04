const express = require("express");
const bodyParser = require("body-parser");
const corc = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");

const app = express();

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use(corc());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

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
