const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const corc = require("cors");
const morgan = require("morgan");

const apiRouter = require("./routes/router")
const env = require("./config/env")

const app = express();

//DB connection
mongoose.connect(env.MONGO_URI)
.then(() => console.log('DB connected'))
.catch(error => console.log(error))

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(corc());

// routing
app.use("/api", apiRouter);

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
