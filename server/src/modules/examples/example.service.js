import Example from './example.model';
import { findUserById } from '../users/user.service';

export const attrExamples = [
    '_id',
    'title',
    'description',
    'comments',
    'author',
    'users',
    'questions',
    'createdAt',
    'updatedAt',
];

export async function findExamples(attr, limit, page, query) {
    try {
        const _limit = +limit || 10;
        const _skip = _limit * (+page - 1 || 0);

        const examples = await Example.find(query)
            .limit(_limit)
            .skip(_skip)
            .select(attr);
        return examples;
    } catch (error) {
        console.log(`Error in func: findExamples: ${error.stack}`);
        throw new Error();
    }
}

export async function findExampleDetail(data) {
    try {
        const example = await Example.findOne(data)
            .populate('author', ['phone', 'name', 'email'])
            .populate('comments.user', ['name'])
            .populate('users.user', ['name']);
        return example;
    } catch (error) {
        console.log(`Error in func: findExampleDetail: ${error.stack}`);
        throw new Error();
    }
}

async function calculateScore(userId, score, example) {
    try {
        const user = await findUserById(userId);
        if (user) {
            const exampleIndex = user.doneExamples.indexOf({
                example: example._id,
            });
            console.log('exampleIndex', exampleIndex);
            const exampleData = {
                example: example._id,
                score,
            };
            if (exampleIndex > -1)
                user.doneExamples.set(exampleIndex, exampleData);
            else user.doneExamples.push(exampleData);
            //
            const userIndex = example.users.indexOf({ user: user._id });
            const userData = {
                user: user._id,
                score,
            };
            if (userIndex > -1) example.users.set(userIndex, userData);
            else example.users.push(userData);

            await user.save();
        }
    } catch (error) {
        console.log(`Error in func: calculateScore: ${error.stack}`);
        throw new Error();
    }
}

export async function updateArticleToDB(data, example) {
    try {
        const {
            title,
            description,
            questions,
            comment,
            user,
            deletedCommentId,
            score,
        } = data;

        if (title) example.title = title;
        if (description) example.description = description;
        if (questions) example.questions = questions;
        if (comment) {
            example.comments.push({
                message: comment,
                user: user._id,
            });
        }
        if (deletedCommentId && example.comments?.length) {
            example.comments.pull({ _id: deletedCommentId });
        }
        if (score) await calculateScore(user._id, score, example);

        await example.save();
        return await findExampleDetail({ _id: example._id });
    } catch (error) {
        console.log(`Error in func: updateArticle: ${error.stack}`);
        throw new Error();
    }
}
