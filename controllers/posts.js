const errorHandler = require("../utils/errorHandler");
const Post = require("../models/post");
const Comment = require("../models/comment");
const mongoose = require("mongoose");

module.exports.getAll = async function (req, res) {

  try {

    const userId = req.user ? converToObjectId(req.user.authorId) : ""

    console.log(req.user);

    const { tag, offset = 0, limit = 20, authorId } = req.query

    let matchQuery = {}

    if(tag) {
      matchQuery.tags = { $in: [tag] }
    }

    if(authorId) {
      matchQuery.author = converToObjectId(authorId)
    }

    const posts = await Post.aggregate([
      { $match: matchQuery },
      { $sort: { updatedAt: -1 }},
      { $skip: +offset },
      { $limit: +limit },

      addLikeFieldStage(userId),

      ...postStages
    ]);

    res.status(200).json(posts);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getById = async function (req, res) {

  const { id } = req.params

  try {
    const post = await Post.aggregate([
      { $match: { _id: converToObjectId(id) } },
      { $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
          pipeline: [
            { $project: { postId: 0 } },
            ...authorLookUpStage
          ],
        },
      },
      ...postStages,
    ]);

    const [result] = post

    res.status(200).json(result);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async function (req, res) {
  try {
    const post = await new Post({
      ...req.body,
      author: req.user._id,
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

  const { id } = req.params

  try {
    await Post.deleteOne({ _id: id });
    await Comment.find({ postId: id }).deleteMany({});
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
    const post = await Post.aggregate([
      { $match: { _id: converToObjectId(req.params.id) } },
      addLikeFieldStage(req.user._id)
    ]);

    // because aggregate returns list
    const [result] = post;

    if (result) {
      let toggleLikeOption;
      if (result.isLiked) {
        toggleLikeOption = { $pull: { usersLiked: req.user._id } };
      } else {
        toggleLikeOption = { $push: { usersLiked: req.user._id } };
      }
      const toggledLikePost = await Post.findByIdAndUpdate(
        { _id: req.params.id },
          toggleLikeOption,
        { new: true }
      );

      //sends only updated fields
      const updatedFields = {
        likes: toggledLikePost.usersLiked.length,
        isLiked: toggledLikePost.usersLiked.includes(req.user._id),
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
const converToObjectId = (id) => mongoose.Types.ObjectId(id);
 
// stage to add "isLiked" field
const addLikeFieldStage = (id) => ({
  $addFields: {
    isLiked: {
      $cond: [{ $in: [ id, "$usersLiked"] }, true, false],
    },
  },
})

// stage to get author info
const authorLookUpStage = [
  { $lookup: {
      from: "authors",
      localField: "author",
      foreignField: "_id",
      as: "author",
      pipeline: [{ $project: { firstName: 1, lastName: 1, imgSrc: 1, _id: 0 } }],
    },
  },
  { $unwind: "$author" },
]

// common stages
const postStages = [
  ...authorLookUpStage,
  { $addFields: { likes: { $size: "$usersLiked" } } },
  { $project: { usersLiked: 0 } },
];

