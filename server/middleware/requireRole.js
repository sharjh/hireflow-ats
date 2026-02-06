const requireRole = (role) => {
    return (req, res, next) => {
        if (role !== req.user.role) {
            return res.status(403).json({error: "Forbidden"});
        };
        next();
    };
};

module.exports = requireRole;