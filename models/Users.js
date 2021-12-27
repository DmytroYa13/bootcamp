const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({

    userName: { type: String, require: true, unique: true },

    email: { type: String, require: true, unique: true },

    password: { type: String, require: true },

    imgSrc: { type: String, default: null }
},

{
  timestamps: true,
});

module.exports = mongoose.model("Users", UsersSchema);
