import Response from '../../helpers/commonResponse';
import homeService from './home.service';

function getQuery(videoQ, examQ, articleQ) {
    let videoQuery;
    if (videoQ.author) videoQuery = { author: videoQ.author };
    let examQuery;
    if (examQ.author) examQuery = { author: examQ.author };
    let articleQuery;
    if (articleQ.author) articleQuery = { author: articleQ.author };
    return { videoQuery, examQuery, articleQuery };
}

export const getHomeList = async (req, res) => {
    try {
        const { query } = req;
        const { video: videoQ, exam: examQ, article: articleQ } = query;

        const { videoQuery, examQuery, articleQuery } = getQuery(
            videoQ,
            examQ,
            articleQ
        );

        const [article, exam, video] = await Promise.all([
            homeService.getArticleList(
                articleQ.limit,
                articleQ.page,
                videoQuery
            ),
            homeService.getExamList(examQ.limit, examQ.page, examQuery),
            homeService.getVideoList(videoQ.limit, videoQ.page, articleQuery),
        ]);

        return res.status(200).send(
            new Response(200, 'Get home list successfully', {
                article,
                exam,
                video,
            })
        );
    } catch (err) {
        console.log('Error in getHomeList func', err);
        res.status(400).send(new Response(400, err.message));
    }
};
