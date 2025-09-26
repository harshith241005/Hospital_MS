"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
function authorize(allowed) {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (!allowed.includes(user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
}
