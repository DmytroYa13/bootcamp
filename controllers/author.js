const errorHandler = require("../utils/errorHandler");
const Author = require("../models/author");

module.exports.getAuthor = async function (req, res) {

  try {

    const currentAuthor = req.user

    if(currentAuthor) {
      const author = await Author.findById(currentAuthor)
      res.status(200).json(author)
    }

  } catch (e) {
    errorHandler(res, e);
  }
};


module.exports.update = async function (req, res) {

  const { id } = req.params

  try {
    const author = await Author.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(author);

  } catch (e) {
    errorHandler(res, e);
  }
};