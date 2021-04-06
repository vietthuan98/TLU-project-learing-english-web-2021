import { login, logout, register, verifyEmail } from './auth.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { validateRegister } from '../auth/auth.validate';

const authRoute = (router) => {
    router.post('/auth/login', login);
    router.post('/auth/logout', authenticate, logout);
    router.post('/auth/register', validateRegister, register);
    router.get('/auth/verify', verifyEmail);
};

export default authRoute;
