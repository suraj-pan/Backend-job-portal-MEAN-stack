module.exports = (...allowedRoles) => (req, res, next) => {
    if (!req.user) return res.status(401).json({ msg: 'Unauthorized' });
    if (!allowedRoles.includes(req.user.role)) return res.status(403).json({ msg: 'Forbidden' });
    next();
};
