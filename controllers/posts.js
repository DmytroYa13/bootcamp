const errorHandler = require("../utils/errorHandler");
const Post = require("../models/post");
const mongoose = require("mongoose");

// TODO: delete after creating auth
const author = {
  id: "61dad3027e81323ad0748a3d",
};

module.exports.getAll = async function (req, res) {
  try {
    const posts = await Post.aggregate([...postsStages]);

    res.status(200).json(posts);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getById = async function (req, res) {

  const { id } = req.params

  try {
    const post = await Post.aggregate([
      { $match: { _id: getObjectId(id) } },
      ...postsStages,
    ]);

    res.status(200).json(post);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async function (req, res) {
  try {
    const post = await new Post({
      ...req.body,
      author: author.id, //TODO change after auth
    }).save();

    res.status(201).json(post);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async function (req, res) {

  const { id } = req.params

  try {
    const post = await Post.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(post);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.remove = async function (req, res) {
  try {
    await Post.remove({ _id: req.params.id });
    res.status(200).json({
      message: "Post deleted",
    });
  } catch (e) {
    errorHandler(res, e);
  }
};


// like api (if like exists - remove, if not - add)
module.exports.toggleLike = async function (req, res) {
  try {
    const result = await Post.aggregate([
      { $match: { _id: getObjectId(req.params.id) } },

      addLikeFieldStage
    ]);

    // because aggregate returns list
    const [post] = result;

    if (post) {
      let toggleLikeOption;
      if (post.isLiked) {
        toggleLikeOption = { $pull: { usersLiked: author.id } };
      } else {
        toggleLikeOption = { $push: { usersLiked: author.id } };
      }
      const toggledLikePost = await Post.findByIdAndUpdate(
        { _id: req.params.id },
          toggleLikeOption,
        { new: true }
      );

      //sends only updated fields
      const updatedFields = {
        likes: toggledLikePost.usersLiked.length,
        isLiked: toggledLikePost.usersLiked.includes(author.id),
      };
      res.status(200).json(updatedFields);
    } else {
      res.status(404).json({
        message: "Something went wrong",
      });
    }
  } catch (e) {
    errorHandler(res, e);
  }
};

// creating ObjectId from string for $match stage
const getObjectId = (id) => mongoose.Types.ObjectId(id);
 
// stage to add "isLiked" field
const addLikeFieldStage = {
  $addFields: {
    isLiked: {
      $cond: [{ $in: [getObjectId(author.id), "$usersLiked"] }, true, false],
    },
  },
}

// common stages
const postsStages = [
  {
    $lookup: {
      from: "authors",
      localField: "author",
      foreignField: "_id",
      as: "author",
      pipeline: [{ $project: { firstName: 1, lastName: 1, imgSrc: 1, _id: 0 } }],
    },
  },

  { $unwind: "$author" },

  { $addFields: { likes: { $size: "$usersLiked" } } },

  addLikeFieldStage,

  { $project: { usersLiked: 0 } },
];


