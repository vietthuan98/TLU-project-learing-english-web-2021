import HomeModel from './home.model';
import { attrArticles, findArticles } from '../articles/article.service';
import { attrVideos, findVideos } from '../videos/video.service';
import { attrExams, findExams } from '../exams/exams.service';

import Exam from '../exams/exams.model';
import Video from '../videos/video.model';
import Article from '../articles/article.model';

class HomeService extends HomeModel {
    constructor(...args) {
        super(...args);
    }

    async getArticleList(limit = 10, page = 1, attr = attrArticles, query) {
        try {
            const [items, total] = await Promise.all([
                findArticles(attr, limit, page, query),
                this.article.countDocuments(query),
            ]);
            return { items, total };
        } catch (e) {
            console.log(`Error HOME service getArticleList func`);
            throw new Error(e);
        }
    }

    async getVideoList(limit = 10, page = 1, attr = attrVideos, query) {
        try {
            const [items, total] = await Promise.all([
                findVideos(attr, limit, page, query),
                this.video.countDocuments(query),
            ]);
            return { items, total };
        } catch (e) {
            console.log(`Error HOME service getVideoList func`);
            throw new Error(e);
        }
    }

    async getExamList(limit = 10, page = 1, attr = attrExams, query) {
        try {
            const [items, total] = await Promise.all([
                findExams(attr, limit, page, query),
                this.exam.countDocuments(query),
            ]);
            return { items, total };
        } catch (e) {
            console.log(`Error HOME service getExamList func`);
            throw new Error(e);
        }
    }
}

export default new HomeService(Exam, Video, Article);
