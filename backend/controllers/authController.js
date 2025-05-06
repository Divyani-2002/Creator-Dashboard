import User from '../models/User.js';
import Credit from '../models/Credit.js';
import jwt from 'jsonwebtoken';
import ErrorResponse from '../utils/errorResponse.js';
import { sendTokenResponse } from '../utils/errorResponse.js';

export const register = async (req, res, next) => {
    const { username, email, password, role } = req.body;

    try {
        const user = await User.create({ username, email, password, role });
        await Credit.create({ userId: user._id, totalCredits: 0 });
        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse('Please provide email and password', 400));
    }

    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) return next(new ErrorResponse('Invalid credentials', 401));

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return next(new ErrorResponse('Invalid credentials', 401));

        user.lastLogin = Date.now();
        await user.save();

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

export const getMe = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
};
