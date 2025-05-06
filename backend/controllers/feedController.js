import Credit from '../models/Credit.js';
import Activity from '../models/Activity.js';
import ErrorResponse from '../utils/errorResponse.js';

export const getCredits = async (req, res, next) => {
    try {
        const credit = await Credit.findOne({ userId: req.user.id });
        const activities = await Activity.find({ userId: req.user.id })
            .sort('-createdAt')
            .limit(5);

        res.status(200).json({
            success: true,
            totalCredits: credit?.totalCredits || 0,
            activities
        });
    } catch (err) {
        next(err);
    }
};

export const earnCredits = async (req, res, next) => {
    const { action } = req.body;
    const creditValues = {
        daily_login: 10,
        profile_complete: 20,
        feed_interaction: 5
    };

    try {
        let credit = await Credit.findOne({ userId: req.user.id });
        if (!credit) {
            credit = await Credit.create({ userId: req.user.id, totalCredits: 0 });
        }

        const amount = creditValues[action] || 0;
        credit.totalCredits += amount;
        await credit.save();

        await Activity.create({
            userId: req.user.id,
            action,
            amount,
            description: `Earned ${amount} credits for ${action.replace('_', ' ')}`
        });

        res.status(200).json({ success: true, credits: credit.totalCredits });
    } catch (err) {
        next(err);
    }
};
