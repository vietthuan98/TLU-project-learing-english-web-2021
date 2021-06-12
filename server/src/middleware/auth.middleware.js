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
        return res.status(403).send(new Response(403, 'Unauthorized'));
    } catch (err) {
        console.log('Error on authenticate func: ', err);
        return res.status(403).send(new Response(403, 'Unauthorized'));
    }
};

export function checkUserRoles(allowedRoles) {
    try {
        return (req, res, next) => {
            const roles = JSON.parse(req.user.roles);
            if (roles.some((role) => allowedRoles.includes(role)))
                return next();

            return res
                .status(401)
                .send(
                    new Response(
                        401,
                        'Unauthorized: You have no permission for this action.'
                    )
                );
        };
    } catch (err) {
        console.log('Error on checkUserRoles func: ', err);
        return res.status(401).send(new Response(401, 'Unauthorized'));
    }
}
