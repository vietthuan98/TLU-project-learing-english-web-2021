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

class ExamAPI extends BaseAPI<ExamParams, ExamForm, ExamDetailResponse, ExamResponse> {
    //
}

const examAPI = new ExamAPI("/exams");
export default examAPI;
