import axios, { Response } from "@/plugins/axios";
import { HomeParams } from '../constants';
import { ArticleDetail } from '@/modules/articles/constants';
import { ExamDetail } from '@/modules/exams/constants';
import { VideoDetail } from '@/modules/videos/constants';


const API_URL = process.env.VUE_APP_API_URL;
export interface HomeListResponse extends Response {
    data: {
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
    };
}


export async function getHomeList(params: HomeParams): Promise<HomeListResponse> {
    const url = `${API_URL}/home`;
    return await axios.get(url, { params });
}
