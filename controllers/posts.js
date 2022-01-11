const errorHandler = require("../utils/errorHandler");
const Posts = require("../models/Posts");

// TODO: delete after creating auth
const user = {
  id: "61c4d3f28acc099a7794cbd6",
};

const authorPopulateOption = {
  userName: 1,
  imgSrc: 1,
  _id: 0,
}

module.exports.getAll = async function (req, res) {
  try {
    let posts = await Posts.find().sort({ createdAt: -1 }).populate("author", authorPopulateOption);

    let result = posts.map((post) => postResponseMapper(post, user.id));

    res.status(200).json(result);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getById = async function (req, res) {
  try {
    const post = await Posts.findById(req.params.id).populate("author", authorPopulateOption);
    res.status(200).json(postResponseMapper(post, user.id));
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async function (req, res) {
  try {
    const post = await new Posts({
      ...req.body,
      author: "61c8eab53946fe2df8c4d65f", //TODO change after auth
    }).save();

    res.status(201).json(post);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async function (req, res) {
  try {
    const post = await Posts.findByIdAndUpdate(
      { _id: req.params.id },
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
    await Posts.remove({ _id: req.params.id });
    res.status(200).json({
      message: "Post deleted",
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

// likes api

module.exports.addLike = async function (req, res) {
  try {
    const post = await Posts.findOne({ _id: req.params.id })

    if (post) {
      const likedPost = await Posts.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: { usersLiked: user.id } },
        { new: true }
      ).populate("author", authorPopulateOption);

      res.status(200).json(postResponseMapper(likedPost, user.id));
    } else {
      res.status(404).json({
        message: "Something went wrong",
      });
    }
  } catch (e) {
    errorHandler(res, e);
  }
};


module.exports.removeLike = async function (req, res) {
  try {
    const post = await Posts.findOne({ _id: req.params.id });

    if (post) {
       const unlikedPost = await Posts.findByIdAndUpdate(
        { _id: req.params.id },
        { $pull: { usersLiked: user.id } },
        { new: true }
      ).populate("author", authorPopulateOption);

      res.status(200).json(postResponseMapper(unlikedPost, user.id));
      
    } else {
      res.status(404).json({
        message: "Something went wrong",
      });
    }
  } catch (e) {
    errorHandler(res, e);
  }
};

function postResponseMapper(post, userId) {
  post.likesQuantity = post.usersLiked.length;
  post.isLiked = !!post.usersLiked.find((id) => id.toString() === userId);
  delete post.usersLiked;
  return post;
}
