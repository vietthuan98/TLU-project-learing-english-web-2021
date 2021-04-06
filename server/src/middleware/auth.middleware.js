import Response from '../helpers/commonResponse';
import User from '../modules/users/user.model';
import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
    try {
        const accessToken = req.header('Authorization').replace('Bearer ', '');
        const { _id, email } = jwt.verify(accessToken, process.env.SECRET_KEY);
        const user = await User.findOne({ _id, email, accessToken });
        if (!user) {
            res.status(408).send(new Response(401, 'Unauthorized'));
            return;
        }
        req.user = user;
        req.token = accessToken;
        next();
    } catch (err) {
        console.log('Error on authenticate func: ', err);
        res.status(400).send(new Response(401, err.message));
    }
};
