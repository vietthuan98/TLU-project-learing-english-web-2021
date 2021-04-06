import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { getToken } from '../../helpers/commonFunction';
import { TOKEN_TYPE } from '../../helpers/constants';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 7,
            trim: true,
        },
        accessToken: {
            type: String,
        },
        // refreshToken: {
        //     type: String,
        // },
        isActive: {
            type: Boolean,
            default: false,
        },
        articles: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Article',
            },
        ],
    },
    { timestamps: true }
);

userSchema.statics.findCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        return {
            error: 'User does not exist',
        };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return {
            error: 'Password wrong',
        };
    }
    if (!user.isActive) {
        return {
            error: 'Please check and verify your email',
        };
    }
    return { user };
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const { _id, name, phone, address, email } = user;
    const data = {
        _id,
        name,
        phone,
        address,
        email,
    };
    const accessToken = getToken(data, TOKEN_TYPE.accessToken);
    // const refreshToken = getToken(data, TOKEN_TYPE.refreshToken);
    user.accessToken = accessToken;
    // user.refreshToken = refreshToken;
    await user.save();
    // return { accessToken, refreshToken };
    return accessToken;
};

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        const hashedPassword = await bcrypt.hash(this.password, 8);
        user.password = hashedPassword;
    }
    next();
});

const User = mongoose.model('User', userSchema);
export default User;
