import User from './user.model';

export const attrProfile = [
    '_id',
    'email',
    'name',
    'phone',
    'createdAt',
    'updatedAt',
];

export async function findUserById(_id, attr) {
    const user = await User.findById({ _id }).select(attr);
    return user;
}
