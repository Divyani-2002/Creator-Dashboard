import User from '../models/User.js';
import Credit from '../models/Credit.js';
import ErrorResponse from '../utils/errorResponse.js';

export const getUsersAnalytics = async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeToday = await User.countDocuments({
            lastLogin: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
        });
        const newThisWeek = await User.countDocuments({
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        });

        res.status(200).json({ success: true, totalUsers, activeToday, newThisWeek });
    } catch (err) {
        next(err);
    }
};

export const getAllUsersCredits = async (req, res, next) => {
    try {
        const users = await User.find().select('username email role');
        const credits = await Credit.find();

        const result = users.map(user => {
            const userCredit = credits.find(c => c.userId.equals(user._id));
            return {
                ...user.toObject(),
                totalCredits: userCredit?.totalCredits || 0
            };
        });

        res.status(200).json({ success: true, users: result });
    } catch (err) {
        next(err);
    }
};

export const updateUserCredits = async (req, res, next) => {
    try {
        const { amount } = req.body;
        let credit = await Credit.findOne({ userId: req.params.userId });

        if (!credit) {
            credit = await Credit.create({ userId: req.params.userId, totalCredits: amount });
        } else {
            credit.totalCredits = amount;
            await credit.save();
        }

        res.status(200).json({ success: true, credits: credit.totalCredits });
    } catch (err) {
        next(err);
    }
};
