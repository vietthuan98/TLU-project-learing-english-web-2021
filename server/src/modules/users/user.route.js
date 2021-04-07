import {
    getUsers,
    createUser,
    getProfile,
    updateUser,
} from './user.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { validateUpdateUser } from './user.validate';

const userRoute = (router) => {
    router.get('/users', authenticate, getUsers);
    router.get('/users/me', authenticate, getProfile);
    router.post('/users', createUser);
    router.patch('/users/me', authenticate, validateUpdateUser, updateUser);
};

export default userRoute;
