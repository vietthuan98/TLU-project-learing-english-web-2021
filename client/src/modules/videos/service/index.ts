import axios, { Response } from "@/plugins/axios";
import BaseAPI from "@/plugins/service.base";
import { VideoDetail, VideoForm, VideoParams } from "../constants";

const API_URL = process.env.VUE_APP_API_URL;
export interface VideoResponse extends Response {
  data: {
    items: VideoDetail[];
    total: number;
  };
}

export interface FileResponse extends Response {
  data: {
    url: string;
  };
}

export interface VideoDetailResponse extends Response {
  data: VideoDetail
}

class VideoAPI extends BaseAPI<VideoParams, VideoForm, VideoDetailResponse, VideoResponse> {
  async uploadVideo(file: FormData): Promise<FileResponse> {
    return await axios.post(`${this.url}/image`, file, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
}

const videoAPI = new VideoAPI("/videos");
export default videoAPI;