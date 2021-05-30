import { ArticleDetail } from '@/modules/articles/constants';
import { ExamDetail } from '@/modules/exams/constants';
import { VideoDetail } from '@/modules/videos/constants';

export interface HomeState {
    video: {
        items: VideoDetail[],
        total: number,
    };
    exam: {
        items: ExamDetail[],
        total: number,
    };
    article: {
        items: ArticleDetail[],
        total: number,
    };
    params: HomeParams,
}

interface CommonParams {
    page: number,
    limit: number
}

export interface HomeParams {
    video: CommonParams,
    article: CommonParams,
    exam: CommonParams,
}

export enum HomeMutations {
    SET_VIDEO_LIST = 'SET_VIDEO_LIST',
    SET_VIDEO_TOTAL = 'SET_VIDEO_TOTAL',
    SET_EXAM_LIST = 'SET_EXAM_LIST',
    SET_EXAM_TOTAL = 'SET_EXAM_TOTAL',
    SET_ARTICLE_LIST = 'SET_ARTICLE_LIST',
    SET_ARTICLE_TOTAL = 'SET_ARTICLE_TOTAL',
}