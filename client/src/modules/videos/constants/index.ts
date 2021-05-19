import { CueItem } from '../../../plugins/webvtt';

export interface Translation {
  valid?: boolean;
  meta?: {
    Kind: 'subtitles',
    Language: 'en'
  }
  cues: CueItem[];
}

export interface VideoDetail {
  _id?: string;
  title?: string;
  description?: string | null;
  src: string;
  translation: Translation;
  author?: {
    name?: string;
    _id?: string;
  };
  comments?: {
    _id?: string;
    message?: string;
  }[];
  yours?: boolean;
}

export interface VideoForm {
  _id?: string | null;
  title?: string | null;
  src?: string | null;
  description?: string | null;
  translation?: Translation;
  deletedCommentId?: string | null;
  comment?: string;
}

export interface VideoState {
  videoList: VideoDetail[];
  videoDetail: VideoDetail | null;
  params: VideoParams;
  total: number;
}

export interface VideoParams {
  page: number;
  limit: number;
}