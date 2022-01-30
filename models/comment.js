const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        author: { ref: "Author", type: Schema.Types.ObjectId, require: true },

        content: { type: String, require: true },

        postId: { ref: "Post", type: Schema.Types.ObjectId, require: true },
    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Comment", CommentSchema);
