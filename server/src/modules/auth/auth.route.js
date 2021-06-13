import {
    login,
    logout,
    register,
    verifyEmail,
    updateProfile,
    getProfile,
} from './auth.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { validateRegister, validateUpdateProfile } from '../auth/auth.validate';

const authRoute = (router) => {
    router.post('/auth/login', login);
    router.post('/auth/logout', authenticate, logout);
    router.post('/auth/register', validateRegister, register);
    router.get('/auth/profile', authenticate, getProfile);
    router.patch(
        '/auth/profile',
        authenticate,
        validateUpdateProfile,
        updateProfile
    );
    router.get('/auth/verify', verifyEmail);
};

export default authRoute;
