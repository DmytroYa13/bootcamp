const errorHandler = require("../utils/errorHandler");
const User = require("../models/Users");

module.exports.login = async function (req, res) {
  try {
    const candidate = await User.findOne({ email: req.body.email });

    if (candidate) {
      res.status(200).json({
        message: "User exists",
      });
    } else {
      res.status(404).json({
        message: "User is not registered",
      });
    }

    res.status(200).json(req.body);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.register = async function (req, res) {
  try {
    const user = await new User(req.body).save();
    res.status(201).json({
      message: `${user.userName} has been registered`,
    });
  } catch (e) {
    errorHandler(res, e);
  }
};
