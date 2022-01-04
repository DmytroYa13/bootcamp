const errorHendler = require("../utils/errorHandler");

module.exports.login = function (req, res) {
  try {
    res.status(200).json(req.body);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.register = function (req, res) {
  try {
    res.status(200).json({ register: "test" });
  } catch (e) {
    errorHandler(res, e);
  }
};
