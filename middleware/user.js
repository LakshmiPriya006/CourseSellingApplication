const { JWT_USER_SECRET } = require("../config");

const jwt = require("jsonwebtoken");

function auth(req, res, next){
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_USER_SECRET);
        if (decoded && decoded.id) {
            req.userId = decoded.id;
            return next();
        } else {
            return res.status(403).json({
                message: "Invalid token payload"
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: "Invalid token."
        });
    }
}

module.exports = { auth };