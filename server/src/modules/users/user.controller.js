import Response from '../../helpers/commonResponse';
import User from './user.model';
import { attrProfile, findUserById } from './user.service';

export const getUsers = async (req, res) => {
    try {
        const [users, total] = await Promise.all([
            User.find({}),
            User.count({}),
        ]);
        res.status(200).send(
            new Response(200, 'Get user list successfully', {
                items: users,
                total,
            })
        );
    } catch (err) {
        console.log('Error in getUsers func', err);
        res.status(400).send(new Response(400, err.message));
    }
};

export const createUser = async (req, res) => {
    try {
        const { body } = req;
        const user = new User(body);
        await user.save();
        res.status(200).send(
            new Response(200, 'User created successfully', user)
        );
    } catch (err) {
        console.log('Error in createUser func', err);
        res.status(400).send(new Response(400, err.message));
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await findUserById(req.user._id, attrProfile);
        res.status(200).send(
            new Response(200, 'Get profile successfully', user)
        );
    } catch (err) {
        console.log('Error in createUser func', err);
        res.status(400).send(new Response(400, err.message));
    }
};
