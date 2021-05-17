import axios, { Response } from "@/plugins/axios";
import BaseAPI from "@/plugins/service.base";
import { ArticleDetail, ArticleForm } from "../constants";

const API_URL = process.env.VUE_APP_API_URL;
export interface ArticleResponse extends Response {
  data: {
    items: ArticleDetail[];
    total: number;
  };
}

export interface ArticleDetailResponse extends Response {
  data: ArticleDetail;
}

export interface FileResponse extends Response {
  data: {
    url: string;
  };
}

export interface ArticleParams {
  page?: number;
  limit?: number;
}

class ArticleAPI extends BaseAPI<ArticleParams, ArticleForm, ArticleDetailResponse, ArticleResponse> {
  async uploadImage(file: FormData): Promise<FileResponse> {
    return await axios.post(`${this.url}/image`, file, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
}

const articleAPI = new ArticleAPI("/articles");
export default articleAPI;
