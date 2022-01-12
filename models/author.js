const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roles = require("../utils/roles")

const AuthorSchema = new Schema({

    firstName: { type: String, require: true },

    lastName: { type: String, require: true },

    email: { type: String, require: true, unique: true },

    password: { type: String, require: true },

    imgSrc: { type: String, default: null },

    roles: [{type:String, enum: [roles.admin, roles.user], default: roles.user }]
},

{
  timestamps: true,
});

module.exports = mongoose.model("Author", AuthorSchema);
