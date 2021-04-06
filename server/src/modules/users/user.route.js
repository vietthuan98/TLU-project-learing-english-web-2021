import { getUsers, createUser, getProfile } from './user.controller';
import { authenticate } from '../../middleware/auth.middleware';

const userRoute = (router) => {
    router.get('/users', authenticate, getUsers);
    router.get('/users/me', authenticate, getProfile);
    router.post('/users', createUser);
};

export default userRoute;
