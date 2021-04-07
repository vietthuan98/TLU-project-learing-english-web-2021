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

export const updateUser = async (req, res) => {
    try {
        const { user, body } = req;
        const { name, phone, address, password } = body;
        if (name) {
            user.name = name;
        }
        if (phone) {
            user.phone = phone;
        }
        if (address) {
            user.address = address;
        }
        if (password) {
            user.password = password;
        }
        await user.save();
        return res
            .status(200)
            .send(new Response(200, 'User has been updated', user));
    } catch (err) {
        console.log('Error in updateUser func: ', err);
        return res.status(500).send(new Response(500, err.message));
    }
};
