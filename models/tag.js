const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagsSchema = new Schema({
  _id: String,
});

module.exports = mongoose.model("Tag", TagsSchema);
