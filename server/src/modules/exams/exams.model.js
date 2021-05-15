import mongoose, { Schema } from 'mongoose';

const examSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 100,
        },
        description: {
            type: String,
            trim: true,
            minLength: 3,
            maxLength: 500,
        },
        comments: [
            {
                message: {
                    type: String,
                    required: true,
                    trim: true,
                    minLength: 1,
                    maxLength: 500,
                },
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
            },
        ],
        questions: [
            {
                question: {
                    type: String,
                    required: true,
                    trim: true,
                    minLength: 3,
                    maxLength: 500,
                },
                options: [
                    {
                        type: String,
                        trim: true,
                        required: true,
                        minLength: 3,
                        maxLength: 500,
                    },
                ],
                answer: {
                    type: Number,
                    required: true,
                    trim: true,
                    min: 0,
                    max: 3,
                },
                explanation: {
                    type: String,
                    trim: true,
                    minLength: 3,
                    maxLength: 500,
                },
            },
        ],
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        users: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
                score: {
                    type: Number,
                },
            },
        ],
    },
    { timestamps: true }
);

const Exam = mongoose.model('Exam', examSchema);
export default Exam;
