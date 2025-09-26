"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
function signToken(payload) {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error('JWT_SECRET not configured');
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '7d' });
}
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: 'Email and password are required' });
    const user = await User_1.User.findOne({ email });
    if (!user)
        return res.status(401).json({ message: 'Invalid credentials' });
    const match = await user.comparePassword(password);
    if (!match)
        return res.status(401).json({ message: 'Invalid credentials' });
    const token = signToken({ id: user.id, role: user.role });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role, name: user.name } });
};
exports.login = login;
const me = async (req, res) => {
    const authUser = req.user;
    if (!authUser)
        return res.status(401).json({ message: 'Unauthorized' });
    const user = await User_1.User.findById(authUser.id).select('-password');
    res.json({ user });
};
exports.me = me;
