import mongoose, { Schema } from 'mongoose';

const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 150,
        },
        description: {
            type: String,
            trim: true,
            minLength: 3,
            maxLength: 500,
        },
        duration: {
            type: Number,
            minLength: 0,
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
        comments: [
            {
                message: {
                    type: String,
                    required: true,
                    trim: true,
                    minLength: 1,
                    maxLength: 500,
                },
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
            },
        ],
        src: {
            type: String,
            required: true,
            trim: true,
        },
        cues: [
            {
                identifier: {
                    type: String,
                    trim: true,
                },
                start: {
                    type: Number,
                    required: true,
                },
                end: {
                    type: Number,
                    required: true,
                },
                text: {
                    type: String,
                    required: true,
                    trim: true,
                    minLength: 3,
                    maxLength: 300,
                },
                styles: {
                    type: String,
                    trim: true,
                },
            },
        ],
    },
    { timestamps: true }
);

const Video = mongoose.model('Video', videoSchema);
export default Video;
