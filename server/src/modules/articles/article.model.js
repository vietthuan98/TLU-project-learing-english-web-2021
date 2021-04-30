import mongoose, { Schema } from 'mongoose';

const articleSchema = new mongoose.Schema(
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
        paragraph: [
            {
                type: String,
                required: true,
                trim: true,
            },
        ],
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        image: {
            type: String,
            default: null,
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
    },
    { timestamps: true }
);

const Article = mongoose.model('Article', articleSchema);
export default Article;
