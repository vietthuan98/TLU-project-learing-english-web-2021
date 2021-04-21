import axios, { Response } from '@/plugins/axios';
import BaseAPI from '@/plugins/service.base';
import { ArticleDetail, ArticleForm } from '../constants';

const API_URL = process.env.VUE_APP_API_URL;
export interface ArticleResponse extends Response {
    data: {
        items: ArticleDetail[];
        total: number;
    }
}

export interface FileResponse extends Response {
    data: {
        url: string
    }
}

export interface ArticleParams {
    page?: number;
    limit?: number;
}

class ArticleAPI extends BaseAPI {

    async fetch(params: ArticleParams): Promise<ArticleResponse> {
        return await axios.get(this.url, { params });
    }

    async detail(id: string): Promise<Response> {
        return await axios.get(this.url + '/' + id);
    }


    async uploadImage(file: FormData): Promise<FileResponse> {
        return await axios.post(`${this.url}/image`, file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    async create(data: ArticleForm): Promise<Response> {
        return await axios.post(this.url, data);
    }

    async update(id: string, data: ArticleForm): Promise<Response> {
        return await axios.patch(this.url + '/' + id, data);
    }
}

const articleAPI = new ArticleAPI('/articles');
export default articleAPI;