const jwt = require('jsonwebtoken');

const errorHandler = require("../utils/errorHandler");
const keys = require("../config/env");

module.exports = function (req, res, next) {

    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const authorizationHeader = req.headers.authorization
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1]
            const decodedData = jwt.verify(token, keys.JWT)
            req.user = decodedData
        }
        next()
    } catch (e) {
        errorHandler(res, e);
    }
};