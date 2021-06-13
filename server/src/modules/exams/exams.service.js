import Exam from './exams.model';
import { findUserById } from '../users/user.service';

export const attrExams = [
    '_id',
    'title',
    'description',
    'comments',
    'author',
    'users',
    'questions',
    'explanation',
    'createdAt',
    'updatedAt',
];

export async function findExams(attr, limit, page, query) {
    try {
        const _limit = +limit || 10;
        const _skip = _limit * (+page - 1 || 0);

        const exams = await Exam.find(query)
            .sort({ createdAt: 'desc' })
            .populate('author', ['phone', 'name', 'email'])
            .limit(_limit)
            .skip(_skip)
            .select(attr);
        return exams;
    } catch (error) {
        console.log(`Error in func: findExams: ${error.stack}`);
        throw new Error();
    }
}

export async function findExamDetail(data) {
    try {
        const exam = await Exam.findOne(data)
            .populate('author', ['phone', 'name', 'email'])
            .populate('comments.user', ['name'])
            .populate('users.user', ['name']);
        return exam;
    } catch (error) {
        console.log(`Error in func: findExamDetail: ${error.stack}`);
        throw new Error();
    }
}

async function calculateScore(userId, score, exam) {
    try {
        const user = await findUserById(userId);
        if (user) {
            const examIndex = user.doneExams?.findIndex(
                (item) => String(item.exam) === String(exam._id)
            );
            const examData = {
                exam: exam._id,
                score,
            };
            if (examIndex > -1) user.doneExams.set(examIndex, examData);
            else user.doneExams?.push(examData);
            //
            const userIndex = exam.users?.findIndex(
                (item) => String(item.user._id) === String(user._id)
            );
            const userData = {
                user: user._id,
                score,
            };
            if (userIndex > -1) exam.users.set(userIndex, userData);
            else exam.users.push(userData);

            await user.save();
        }
    } catch (error) {
        console.log(`Error in func: calculateScore: ${error.stack}`);
        throw new Error();
    }
}

export async function updateArticleToDB(data, exam) {
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

        if (title) exam.title = title;
        if (description) exam.description = description;
        if (questions) exam.questions = questions;
        if (comment) {
            exam.comments.push({
                message: comment,
                user: user._id,
            });
        }
        if (deletedCommentId && exam.comments?.length) {
            exam.comments.pull({ _id: deletedCommentId });
        }
        if (score >= 0) await calculateScore(user._id, score, exam);

        await exam.save();
        return await findExamDetail({ _id: exam._id });
    } catch (error) {
        console.log(`Error in func: updateArticle: ${error.stack}`);
        throw new Error();
    }
}
