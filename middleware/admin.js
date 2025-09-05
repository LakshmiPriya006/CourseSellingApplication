const { JWT_ADMIN_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.headers.token;

    // Check if the token was even provided
    if (!token) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    }

    try {
        // This will attempt to verify the token.
        // If it's invalid (expired, wrong secret, etc.), it will throw an error.
        const decoded = jwt.verify(token, JWT_ADMIN_SECRET);

        // If verification is successful, attach the admin ID to the request
        req.adminId = decoded.id;
        
        // Proceed to the next middleware or route handler
        next();

    } catch (ex) {
        // If jwt.verify throws an error, we catch it here
        res.status(400).json({
            message: "Invalid token."
        });
    }
}

module.exports = { auth };