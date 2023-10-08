const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authheader = req.headers.Authorization || req.headers.authorization
    if (authheader && authheader.startsWith("Bearer")) {
        token = authheader.split("")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User not authenticated");
            }
            req.user = decoded.user;
            next();
        });
        if(!token) {
            res.status(401);
            throw new Error("User is not authroized or token is missing");
        }
    }
})

module.exports = validateToken;