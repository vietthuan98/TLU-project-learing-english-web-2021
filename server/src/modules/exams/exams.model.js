import mongoose, { Schema } from 'mongoose';

const examSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
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
                },
                options: [
                    {
                        type: String,
                        trim: true,
                        required: true,
                    },
                ],
                answer: {
                    type: Number,
                    required: true,
                    trim: true,
                },
                explanation: {
                    type: String,
                    trim: true,
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
