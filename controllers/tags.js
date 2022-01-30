const errorHandler = require("../utils/errorHandler");
const mongoose = require("mongoose");
const Tag = require("../models/tag");

module.exports.getAll = async function (req, res) {
  try {
    const tags = await Tag.find()
    res.status(200).json(tags)
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async function (req, res) {
  try {

    const tag = await new Tag({ _id: req.body.name}).save()

    res.status(201).json({message: `${tag._id} has been saved`})
  } catch (e) {
    errorHandler(res, e);
  }
};
