const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({

    firstName: { type: String, require: true },

    lastName: { type: String, require: true },

    email: { type: String, require: true, unique: true },

    password: { type: String, require: true },

    imgSrc: { type: String, default: null }
},

{
  timestamps: true,
});

module.exports = mongoose.model("Author", AuthorSchema);
