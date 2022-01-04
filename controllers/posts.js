const errorHendler = require("../utils/errorHandler");
const fakeData = require("./fakeData");

module.exports.getAll = function (req, res) {
  try {
    res.status(200).json(fakeData);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getById = function (req, res) {
  try {
    res.status(200).json(fakeData[0]);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = function (req, res) {
  try {
    res.status(200).json({ create: "test" });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = function (req, res) {
  try {
    res.status(200).json({ update: "test" });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.remove = function (req, res) {
  try {
    res.status(200).json({ remove: "test" });
  } catch (e) {
    errorHandler(res, e);
  }
};
