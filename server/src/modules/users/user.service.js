import User from './user.model';

export const attrProfile = [
    '_id',
    'email',
    'name',
    'phone',
    'articles',
    'examples',
    'doneExamples',
    'createdAt',
    'updatedAt',
];

export async function findUserById(_id, attr = attrProfile) {
    const user = await User.findById({ _id }).select(attr);
    return user;
}

export async function findUserDetail(data) {
    const user = await User.findOne(data)
        .populate('articles', [
            'title',
            'description',
            'comments',
            'likes',
            'author',
        ])
        .populate('examples', ['title', 'description', 'author', 'comments'])
        .populate('doneExamples.example', ['title']);
    return user;
}
