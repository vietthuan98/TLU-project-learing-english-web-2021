import Response from '../../helpers/commonResponse';
import homeService from './home.service';
import { attrArticles } from '../articles/article.service';
import { attrExams } from '../exams/exams.service';
import { attrVideos } from '../videos/video.service';

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
        let { video: videoQ, exam: examQ, article: articleQ } = query;
        videoQ = typeof videoQ === 'string' ? JSON.parse(videoQ) : {};
        examQ = typeof examQ === 'string' ? JSON.parse(examQ) : {};
        articleQ = typeof articleQ === 'string' ? JSON.parse(articleQ) : {};

        const { videoQuery, examQuery, articleQuery } = getQuery(
            videoQ,
            examQ,
            articleQ
        );

        const [article, exam, video] = await Promise.all([
            homeService.getArticleList(
                articleQ.limit,
                articleQ.page,
                attrArticles,
                videoQuery
            ),
            homeService.getExamList(
                examQ.limit,
                examQ.page,
                attrExams,
                examQuery
            ),
            homeService.getVideoList(
                videoQ.limit,
                videoQ.page,
                attrVideos,
                articleQuery
            ),
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
