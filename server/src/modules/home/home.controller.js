import Response from '../../helpers/commonResponse';
import homeService from './home.service';

export const getHomeList = async (req, res) => {
    try {
        const { query } = req;
        const { video: videoQ, exam: examQ, article: articleQ } = query;

        const [article, exam, video] = await Promise.all([
            homeService.getArticleList(articleQ.limit, articleQ.page),
            homeService.getExamList(examQ.limit, examQ.page),
            homeService.getVideoList(videoQ.limit, videoQ.page),
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
