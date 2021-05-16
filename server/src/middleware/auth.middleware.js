import Response from '../helpers/commonResponse';
import User from '../modules/users/user.model';
import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
    try {
        const accessToken = req.header('Authorization').replace('Bearer ', '');
        if (accessToken) {
            const { _id, email } = jwt.verify(
                accessToken,
                process.env.SECRET_KEY
            );
            if (_id && email) {
                const user = await User.findOne({ _id, email, accessToken });
                if (!user) {
                    return res
                        .status(401)
                        .send(new Response(401, 'Unauthorized'));
                }
                req.user = user;
                req.token = accessToken;
                return next();
            }
        }
        return res.status(401).send(new Response(401, 'Unauthorized'));
    } catch (err) {
        console.log('Error on authenticate func: ', err);
        return res.status(401).send(new Response(401, 'Unauthorized'));
    }
};
