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