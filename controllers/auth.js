const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const errorHandler = require("../utils/errorHandler");
const Author = require("../models/author");
const keys = require("../config/env");

module.exports.login = async function (req, res) {
  try {
    const candidate = await Author.findOne({ email: req.body.email });
    if (candidate) {
      const passwordResult = bcrypt.compareSync(
        req.body.password,
        candidate.password
      );

      if (passwordResult) {
        const token = jwt.sign(
          {
            firstName: candidate.firstName,
            lastName: candidate.lastName,
            email: candidate.email,
            roles: candidate.roles,
            authorId: candidate._id,
          },
          keys.JWT,
          { expiresIn: 60 * 60 * 6 }
        );

        res.status(200).json({
          token: `Bearer ${token}`,
        });
      } else {
        res.status(401).json({
          message: "Wrong password",
        });
      }
    } else {
      res.status(404).json({
        message: "User is not registered",
      });
    }
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.register = async function (req, res) {
  try {
    const candidate = await Author.findOne({ email: req.body.email });
    if (candidate) {
      res.status(409).json({
        message: "User already exists",
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const password = req.body.password;
      const author = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        imgSrc: req.file ? req.file.path : null,
        roles: req.body.roles,
        password: bcrypt.hashSync(password, salt),
      });
      await author.save();
      res.status(201).json({email: author.email});
    }
  } catch (e) {
    errorHandler(res, e);
  }

};
