const jwt = require('jsonwebtoken')

const errorHandler = require("../utils/errorHandler");
const keys = require("../config/env");


module.exports = function (roles) {

    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const authorizationHeader = req.headers.authorization
            if (!authorizationHeader) {
                return res.status(403).json({message: "User is not authorized"})
            }
            const {roles: userRoles} = jwt.verify(token, keys.JWT)
            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(403).json({message: "You do not have access"})
            }
            next();
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "User is not authorized"})
        }
    }
};