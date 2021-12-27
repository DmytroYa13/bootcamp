const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({

  author: { ref: "Users", type: Schema.Types.ObjectId },

  title: { type: String, require: true },

  subTitle: { type: String },

  content: { type: String, require: true },

  tags: { type: [String] },

  likesQuantity: { type: Number },

  isLiked: { type: Boolean },

  usersLiked: [{ ref: 'Users', type: Schema.Types.ObjectId }],

},

{
  timestamps: true,
});

module.exports = mongoose.model("Posts", PostSchema);
