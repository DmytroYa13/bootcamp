const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({

  author: { ref: "Author", type: Schema.Types.ObjectId },

  title: { type: String, require: true },

  subTitle: { type: String },

  content: { type: String, require: true },

  tags: { type: [String] },

  usersLiked: [{ ref: 'Author', type: Schema.Types.ObjectId }],

},

{
  timestamps: true,
});

module.exports = mongoose.model("Post", PostSchema);
