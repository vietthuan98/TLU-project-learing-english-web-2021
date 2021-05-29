export interface VideoDetail {
  _id: string;
  title?: string;
  description?: string | null;
  src: string;
  cues: CueItem[];
  author?: {
    name?: string;
    _id?: string;
  };
  duration?: number;
  comments?: {
    _id?: string;
    message?: string;
    userId: {
      _id: string;
      name: string;
    };
    isShow?: boolean;
    yours: boolean;
  }[];
  yours?: boolean;
  createdAt?: string;
  poster?: string;
  likes?: {
    _id: string;
    name: string;
  }[];
}

export interface VideoForm {
  _id?: string | null;
  title?: string | null;
  src?: string | null;
  description?: string | null;
  translation?: CueItem[];
  deletedCommentId?: string | null;
  comment?: string;
  like?: boolean;
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

export interface CueItem {
  identifier: string;
  start: number;
  end: number;
  text: string;
  styles: string;
}
