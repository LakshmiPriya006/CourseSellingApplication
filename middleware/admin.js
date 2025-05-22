const { JWT_ADMIN_SECRET } = require("../config")

const jwt = require("jsonwebtoken");

function auth(req, res, next){
    const token = req.headers.token;

    const response = jwt.verify(token, JWT_ADMIN_SECRET);

    if (response.id) {
        req.adminId = response.id;
        next();

    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
}

module.exports = {auth}