const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagsSchema = new Schema({

  name: { type: String, unique: true, require: true },
  
});

module.exports = mongoose.model("Tags", TagsSchema);
