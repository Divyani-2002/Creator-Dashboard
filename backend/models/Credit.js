import mongoose from 'mongoose';

const CreditSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    totalCredits: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model('Credit', CreditSchema);
