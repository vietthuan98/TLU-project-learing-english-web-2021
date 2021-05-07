import axios, { Response } from "@/plugins/axios";
import BaseAPI from "@/plugins/service.base";
import { ExampleDetail, ExampleForm } from "../constants";

const API_URL = process.env.VUE_APP_API_URL;
export interface ExampleResponse extends Response {
    data: {
        items: ExampleDetail[];
        total: number;
    };
}

export interface ArticleParams {
    page?: number;
    limit?: number;
}

class ExampleAPI extends BaseAPI {
    async fetch(params: ArticleParams): Promise<ExampleResponse> {
        return await axios.get(this.url, { params });
    }

    async detail(id: string): Promise<Response> {
        return await axios.get(this.url + "/" + id);
    }

    async create(data: ExampleForm): Promise<Response> {
        return await axios.post(this.url, data);
    }

    async update(id: string, data: ExampleForm): Promise<Response> {
        return await axios.patch(this.url + "/" + id, data);
    }
}

const exampleAPI = new ExampleAPI("/examples");
export default exampleAPI;
