import Article from './article.model';

export const attrArticles = [
    '_id',
    'title',
    'paragraph',
    'description',
    'likes',
    'image',
    'comments',
    'author',
    'createdAt',
    'updatedAt',
];

export async function findArticles(attr, limit, page, query) {
    const _limit = +limit || 10;
    const _skip = _limit * (+page - 1 || 0);

    const articles = await Article.find(query)
        .limit(_limit)
        .skip(_skip)
        .select(attr)
        .populate('author', ['name']);
    return articles;
}

export async function updateArticle() {
    //
}
