export interface ArticleDetail {
    author: {
        name: string;
        _id?: string;
    }
    comments: {
        _id?: string;
        message?: string;
    }[];
    image?: string;
    likes: {
        _id?: string;
        userId?: string;
    }[];
    title?: string;
    _id?: string;
    paragraph: string[];
    description: string | null;
    yours?: boolean;
}

export interface ArticleForm {
    _id?: string | null;
    title: string | null;
    paragraph: string[];
    description: string | null;
    image?: string | null;
}

export interface ArticleState {
    articleList: ArticleDetail[];
    params: ArticleParams;
    total: number;
}

export interface ArticleParams {
    page?: number;
    limit?: number;
}