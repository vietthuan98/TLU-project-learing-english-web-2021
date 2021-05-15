import mongoose, { Schema } from 'mongoose';

const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 100,
        },
        description: {
            type: String,
            trim: true,
            minLength: 3,
            maxLength: 500,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        src: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

const Video = mongoose.model('Video', videoSchema);
export default Video;
