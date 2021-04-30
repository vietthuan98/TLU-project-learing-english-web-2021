import Response from '../../helpers/commonResponse';
import Example from './example.model';
import {
    findExamples,
    attrExamples,
    findExampleDetail,
    updateArticleToDB,
} from './example.service';

export const getExamples = async (req, res) => {
    try {
        const { query } = req;

        const [items, total] = await Promise.all([
            findExamples(attrExamples, query.limit, query.page),
            Example.count(),
        ]);
        res.status(200).send(
            new Response(200, 'Get example list successfully', {
                items,
                total,
            })
        );
    } catch (err) {
        console.log('Error in getExamples func', err);
        res.status(400).send(new Response(400, err.message));
    }
};

export const createExample = async (req, res) => {
    try {
        const { body, user } = req;
        const example = new Example(body);
        example.author = user._id;
        user.examples.push(example._id);
        await Promise.all([example.save(), user.save()]);

        return res.status(200).send(
            new Response(200, 'Example created successfully', {
                user,
                example,
            })
        );
    } catch (err) {
        console.log('Error in createExample func', err);
        return res.status(400).send(new Response(400, err.message));
    }
};

export const getMyExamples = async (req, res) => {
    try {
        const { user, query } = req;
        const _query = {
            author: user._id,
        };

        const [items, total] = await Promise.all([
            findExamples(attrExamples, query.limit, query.page, _query),
            Article.count(_query),
        ]);
        return res.status(200).send(
            new Response(200, 'Get example list successfully', {
                items,
                total,
            })
        );
    } catch (err) {
        console.log('Error in getMyExamples func', err);
        return res.status(400).send(new Response(400, err.message));
    }
};

export const getExampleDetail = async (req, res) => {
    try {
        const example = await findExampleDetail({
            _id: req.params.id,
        });
        if (!example) {
            return res
                .status(404)
                .send(new Response(404, 'Example is not found'));
        }
        return res
            .status(200)
            .send(new Response(200, 'Your example here', example));
    } catch (err) {
        console.log('Error in getExampleDetail func', err);
        return res.status(500).send(new Response(500, err.message));
    }
};

export const updateExample = async (req, res) => {
    try {
        const { user, body } = req;
        body.user = user;
        const example = await findExampleDetail({
            _id: req.params.id,
        });
        if (!example) {
            return res
                .status(404)
                .send(new Response(404, 'Example is not found'));
        }
        if (body.title || body.description || body.questions) {
            if (example.author._id.toString() !== user._id.toString())
                return res
                    .status(404)
                    .send(new Response(403, 'You do not have permission'));
        }
        if (body.score > example.questions.length) {
            return res
                .status(422)
                .send(
                    new Response(
                        422,
                        'Your score must be less than total questions'
                    )
                );
        }

        const exampleResult = await updateArticleToDB(body, example);

        return res
            .status(200)
            .send(new Response(200, 'Your example here', exampleResult));
    } catch (err) {
        console.log('Error in updateExample func', err);
        return res.status(500).send(new Response(500, err.message));
    }
};
