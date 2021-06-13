import { ArticleDetail } from "@/modules/articles/constants";
import { ExamDetail } from "@/modules/exams/constants";
import { VideoDetail } from "@/modules/videos/constants";

export interface RegisterBody {
  name: string;
  email: string;
  phone: string;
  password: string;
  roles: string[];
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface AuthUser {
  _id: string;
  isActive: boolean;
  email: string;
  name: string;
  phone: string;
  address: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
  accessToken: string;
}

export enum USER_ROLE {
  TEACHER = 'teacher',
  STUDENT = 'student'
}

export interface AuthState {
  userName: string;
  user: AuthUser | null;
  profile: AuthUser | null;
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
  params: AuthParams,

}

export interface CommonParams {
  page: number,
  limit: number;
  author?: string;

}

export interface AuthParams {
  video: CommonParams,
  article: CommonParams,
  exam: CommonParams,
}


export enum AuthMutations {
  SET_USER = 'SET_USER',
  SET_PROFILE = 'SET_PROFILE',
  SET_ARTICLE_LIST = "SET_ARTICLE_LIST",
  SET_ARTICLE_TOTAL = "SET_ARTICLE_TOTAL",
  SET_EXAM_LIST = "SET_EXAM_LIST",
  SET_EXAM_TOTAL = "SET_EXAM_TOTAL",
  SET_VIDEO_LIST = "SET_VIDEO_LIST",
  SET_VIDEO_TOTAL = "SET_VIDEO_TOTAL"
}

