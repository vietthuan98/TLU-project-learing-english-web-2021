import axios, { Response } from "@/plugins/axios";
import BaseAPI from "@/plugins/service.base";
import { ExamDetail, ExamForm, ExamParams } from "../constants";

const API_URL = process.env.VUE_APP_API_URL;

export interface ExamResponse extends Response {
    data: {
        items: ExamDetail[];
        total: number;
    };
}

export interface ExamDetailResponse extends Response {
    data: ExamDetail;
}

class ExamAPI extends BaseAPI {
    async fetch(params: ExamParams): Promise<ExamResponse> {
        return await axios.get(this.url, { params });
    }

    async detail(id: string): Promise<ExamDetailResponse> {
        return await axios.get(this.url + "/" + id);
    }

    async create(data: ExamForm): Promise<ExamResponse> {
        return await axios.post(this.url, data);
    }

    async update(id: string, data: ExamForm): Promise<ExamDetailResponse> {
        return await axios.patch(this.url + "/" + id, data);
    }
}

const examAPI = new ExamAPI("/exams");
export default examAPI;
