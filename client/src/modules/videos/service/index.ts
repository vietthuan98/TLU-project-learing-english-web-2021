import axios, { Response } from "@/plugins/axios";
import BaseAPI from "@/plugins/service.base";
import { VideoDetail, VideoForm, VideoParams } from "../constants";

export interface VideoResponse extends Response {
  data: {
    items: VideoDetail[];
    total: number;
  };
}

export interface FileResponse extends Response {
  success: boolean;
  message: string;
  data: {
    url: string;
  };
}

export interface VideoDetailResponse extends Response {
  data: VideoDetail;
}

class VideoAPI extends BaseAPI<
  VideoParams,
  VideoForm,
  VideoDetailResponse,
  VideoResponse
> {
  async uploadVideo(file: FormData): Promise<FileResponse> {
    return await axios.post(`${this.url}/upload-to-cloud`, file, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
}

const videoAPI = new VideoAPI("/videos");
export default videoAPI;
