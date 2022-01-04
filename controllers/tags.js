const errorHandler = require("../utils/errorHandler");
const Tag = require("../models/Tags");
const Tags = require("../models/Tags");

module.exports.getAll = async function (req, res) {
  try {
    const tags = await Tags.find()
    res.status(200).json(tags)
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async function (req, res) {
  try {
    const tag = await new Tag(req.body).save()
    res.status(201).json({message: `${tag.name} has been saved`})
  } catch (e) {
    errorHandler(res, e);
  }
};
