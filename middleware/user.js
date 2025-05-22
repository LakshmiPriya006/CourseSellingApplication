const { JWT_USER_SECRET } = require("../config");

const jwt = require("jsonwebtoken");

function auth(req, res, next){
    const token = req.headers.token;

    const response = jwt.verify(token, JWT_USER_SECRET);

    if (response.id) {
        req.userId = response.id;
        next();

    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
}

module.exports = { auth };