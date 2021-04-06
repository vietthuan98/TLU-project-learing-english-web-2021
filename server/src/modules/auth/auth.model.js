import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../users/user.model';

const Schema = mongoose.Schema;

const userVerificationSchema = Schema(
    {
        token: {
            type: String,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

userVerificationSchema.statics.compareToken = async function (receivedToken) {
    const { _id, token } = jwt.verify(receivedToken, process.env.VERIFY_KEY);
    const userVerification = await UserVerification.findOne({ _id, token });
    if (!userVerification) {
        throw new Error('Token is invalid');
    }
    const isExpired =
        new Date(userVerification.createdAt).getTime() - Date.now() <
        3 * 86400 * 1000; //expired in 3 days
    if (!isExpired) {
        throw new Error('Token is expired');
    }
    const user = await User.findById({ _id: userVerification.user });
    user.isActive = true;
    await user.save();
    await UserVerification.deleteOne({ _id, token });
};

userVerificationSchema.post('save', async function () {
    this.token = jwt.sign(
        { _id: this._id, token: this.token },
        process.env.VERIFY_KEY
    );
});

const UserVerification = mongoose.model(
    'User_Verification',
    userVerificationSchema
);
export default UserVerification;
