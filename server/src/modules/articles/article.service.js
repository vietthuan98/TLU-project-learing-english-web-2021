import Article from './article.model';

export const attrArticles = [
    '_id',
    'title',
    'paragraph',
    'likes',
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
        .select(attr);
    return articles;
}
