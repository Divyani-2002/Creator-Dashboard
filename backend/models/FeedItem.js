import mongoose from 'mongoose';

const FeedItemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    sourceId: {
        type: String,
        required: true
    },
    source: {
        type: String,
        enum: ['twitter', 'reddit'],
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    reported: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

FeedItemSchema.index({ userId: 1, sourceId: 1 }, { unique: true });

export default mongoose.model('FeedItem', FeedItemSchema);
