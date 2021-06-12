import Response from '../../helpers/commonResponse';
import User from '../users/user.model';
import UserVerification from './auth.model';
import { sendVerifyEmail } from '../../plugins/email';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, error } = await User.findCredentials(email, password);
        if (error) {
            return res.status(400).send(new Response(400, error));
        }
        if (!user.isActive)
            return res
                .status(400)
                .send(new Response(400, 'Please check and verify your email.'));
        const token = await user.generateAuthToken();
        const _user = user.toObject();
        if (_user.roles && typeof _user.roles === 'string')
            _user.roles = JSON.parse(_user.roles);
        delete _user.password;
        return res
            .status(200)
            .send(
                new Response(200, 'Login successfully', { user: _user, token })
            );
    } catch (err) {
        console.log('Error in login func: ', err);
        return res.status(400).send(new Response(400, err.message));
    }
};

export const logout = async (req, res) => {
    try {
        const { user } = req;
        user.accessToken = '';
        user.refreshToken = '';
        await user.save();
        res.status(200).send(new Response(200, 'Log out successfully'));
    } catch (err) {
        console.log('Error in logout func: ', err);
        res.status(400).send(new Response(400, err.message));
    }
};

export const register = async (req, res) => {
    try {
        const { email, name, roles, password, phone } = req.body;
        const data = {
            email,
            name,
            roles: JSON.stringify(roles),
            password,
            phone,
        };

        const isExist = await User.exists({ email });
        if (isExist) {
            const message = 'Your email has been used before';
            return res.status(422).send(new Response(400, message));
        }
        const user = new User(data);
        await user.save();

        const verification = new UserVerification({
            user: user._id,
        });
        await verification.save();

        const link = `${req.protocol}://${req.hostname}:${process.env.PORT}/api/auth/verify?token=${verification.token}`; //TODO check here on production
        const sendEmailResponse = await sendVerifyEmail(user.email, user, link);

        res.status(200).send(
            new Response(200, 'User created successfully', {
                user,
                verification,
                host: link,
            })
        );
    } catch (err) {
        console.log('Error in register func: ', err);
        res.status(400).send(new Response(400, err.message));
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        await UserVerification.compareToken(token);
        res.status(200).send(new Response(200, 'Your email is verified'));
    } catch (err) {
        console.log('Error in verifyEmail func', err);
        res.status(400).send(new Response(400, err.message));
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { user, body } = req;
        const userData = await User.findOne({ _id: user._id });
        if (!userData) {
            return res
                .status(422)
                .send(
                    new Response(
                        422,
                        'Some thing wrongs, you does not exist @@'
                    )
                );
        }
        const { name, phone, address, password, newPassword, roles } = body;
        if (name) userData.name = name;
        if (phone) userData.phone = phone;
        if (address) userData.address = address;
        if (roles) userData.roles = JSON.stringify(roles);
        if (newPassword && password) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res
                    .status(422)
                    .send(new Response(422, 'Password wrong'));
            userData.password = newPassword;
        }
        await userData.save();
        const _user = userData.toObject();
        if (userData.roles && typeof userData.roles === 'string') {
            _user.roles = JSON.parse(userData.roles);
        }
        return res
            .status(200)
            .send(new Response(200, 'Your profile updated', _user));
    } catch (err) {
        console.log('Error in updateProfile func', err);
        res.status(400).send(new Response(400, err.message));
    }
};
