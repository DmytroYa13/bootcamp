const errorHandler = require("../utils/errorHandler");
const Comment = require("../models/comment");

// TODO: delete after creating auth
const author = {
    id: "61dad3027e81323ad0748a3d",
};

module.exports.create = async function (req, res) {

  const { content } = req.body;
  const { postId } = req.params;

  try {
    const comment = await new Comment({
      postId,
      content,
      author: author.id,
    }).save();

    res.status(200).json(comment);

  } catch (e) {
     errorHandler(res, e);
  }
};

module.exports.update = async function (req, res) {
  
  const { id } = req.params;

  try {

    const candidate = await Comment.findById(id);
    isCanUpdate = candidate.author.toString() === author.id;

    if (isCanUpdate) {
      const updatedCommemt = await Comment.findByIdAndUpdate({ _id: id }, { $set: { content: req.body.content } }, { new: true });

      res.status(200).json(updatedCommemt);
    } else {

      res.status(405).json({
        message: "Can not update comment",
      });
    }
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.remove = async function (req, res) {

  const { id } = req.params;

  try {
    const candidate = await Comment.findById(id);
    isCanDelete = candidate.author.toString() === author.id;

    if (isCanDelete) {
      await Comment.deleteOne({ _id: id });

      res.status(200).json({
        message: "Comment deleted",
      });
    } else {
        
      res.status(405).json({
       message: "Can not delete comment",
      });
    }
    } catch (e) {
      errorHandler(res, e);
    }
};
