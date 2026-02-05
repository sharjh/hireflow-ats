const jwt = require('jsonwebtoken');

const requireAuth = async (req, res, next) => {
    console.log("Auth middleware reached");
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]; 
    }
    else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({ error: "Not authorized, no token provided" })
    }

    try {
        //Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (err) {
        return res.status(401).json({ error: "Not authorized, token failed" })
    }
};

module.exports = requireAuth;