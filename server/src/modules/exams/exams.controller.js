import Response from '../../helpers/commonResponse';
import Exam from './exams.model';
import {
    findExams,
    attrExams,
    findExamDetail,
    updateArticleToDB,
} from './exams.service';
import User from '../users/user.model';

export const getExams = async (req, res) => {
    try {
        const { query } = req;
        let queryItems = undefined;
        if (query.title) {
            queryItems = { title: { $regex: query.title, $options: 'i' } };
        }

        const [items, total] = await Promise.all([
            findExams(attrExams, query.limit, query.page, queryItems),
            Exam.countDocuments(queryItems),
        ]);
        res.status(200).send(
            new Response(200, 'Get exam list successfully', {
                items,
                total,
            })
        );
    } catch (err) {
        console.log('Error in getExams func', err);
        res.status(400).send(new Response(400, err.message));
    }
};

export const createExam = async (req, res) => {
    try {
        const { body, user } = req;
        const exam = new Exam(body);
        exam.author = user._id;
        const _user = await User.findOne({ _id: user._id });
        _user.exams.push(exam._id);
        await Promise.all([exam.save(), _user.save()]);

        return res.status(200).send(
            new Response(200, 'Exam created successfully', {
                _user,
                exam,
            })
        );
    } catch (err) {
        console.log('Error in createExam func', err);
        return res.status(400).send(new Response(400, err.message));
    }
};

export const getMyExams = async (req, res) => {
    try {
        const { user, query } = req;
        const _query = {
            author: user._id,
        };

        const [items, total] = await Promise.all([
            findExams(attrExams, query.limit, query.page, _query),
            Article.count(_query),
        ]);
        return res.status(200).send(
            new Response(200, 'Get exam list successfully', {
                items,
                total,
            })
        );
    } catch (err) {
        console.log('Error in getMyExams func', err);
        return res.status(400).send(new Response(400, err.message));
    }
};

export const getExamDetail = async (req, res) => {
    try {
        const exam = await findExamDetail({
            _id: req.params.id,
        });
        if (!exam) {
            return res.status(404).send(new Response(404, 'Exam is not found'));
        }
        return res.status(200).send(new Response(200, 'Your exam here', exam));
    } catch (err) {
        console.log('Error in getExamDetail func', err);
        return res.status(500).send(new Response(500, err.message));
    }
};

export const updateExam = async (req, res) => {
    try {
        const { user, body } = req;
        body.user = user;
        const exam = await findExamDetail({
            _id: req.params.id,
        });
        if (!exam) {
            return res.status(404).send(new Response(404, 'Exam is not found'));
        }
        if (body.title || body.description || body.questions) {
            if (exam.author._id.toString() !== user._id.toString())
                return res
                    .status(404)
                    .send(new Response(403, 'You do not have permission'));
        }
        if (body.score >= 0 && body.score > exam.questions.length) {
            return res
                .status(422)
                .send(
                    new Response(
                        422,
                        'Your score must be less than total questions'
                    )
                );
        }
        const examResult = await updateArticleToDB(body, exam);

        return res
            .status(200)
            .send(new Response(200, 'Your exam here', examResult));
    } catch (err) {
        console.log('Error in updateExam func', err);
        return res.status(500).send(new Response(500, err.message));
    }
};

export const deleteExam = async (req, res) => {
    try {
        const { user, params } = req;

        const exam = await Exam.findById(params.id);
        if (!exam) {
            return res.status(200).send(
                new Response(200, 'This exam has been deleted', {
                    id: params.id,
                })
            );
        }
        const isAuthor = user._id.toString() === exam.author.toString();
        if (!isAuthor) {
            return res
                .status(400)
                .send(
                    new Response(
                        400,
                        'You have no permission to delete this exam.'
                    )
                );
        }
        await Exam.deleteOne({ _id: exam._id });

        return res.status(200).send(
            new Response(200, 'This exam has been deleted', {
                id: params.id,
            })
        );
    } catch (err) {
        console.log('Error in deleteExam func: ', err);
        return res.status(500).send(new Response(500, err));
    }
};
