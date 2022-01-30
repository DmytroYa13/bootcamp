const errorHandler = require("../utils/errorHandler");
const Author = require("../models/author");

module.exports.login = async function (req, res) {
  try {
    const candidate = await Author.findOne({ email: req.body.email });

    if (candidate) {
      res.status(200).json({
        message: "Author exists",
      });
    } else {
      res.status(404).json({
        message: "Author is not registered",
      });
    }

    res.status(200).json(req.body);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.register = async function (req, res) {
  try {
    const author = await new Author(req.body).save();
    res.status(201).json({
      message: `${author.firstName} ${author.lastName} has been registered`,
    });
  } catch (e) {
    errorHandler(res, e);
  }
};
