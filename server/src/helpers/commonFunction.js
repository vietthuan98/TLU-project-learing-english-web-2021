import jwt from 'jsonwebtoken';
import { TOKEN_TYPE } from './constants';

export const getToken = (data, type) => {
    const expiresIn = type === TOKEN_TYPE.accessToken ? '15m' : '24h';
    return jwt.sign(data, process.env.SECRET_KEY, { expiresIn });
};
