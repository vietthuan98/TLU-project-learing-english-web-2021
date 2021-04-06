require('dotenv').config();
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendVerifyEmail = async (email, user, link) => {
    const { name } = user;
    const result = await sgMail.send({
        to: email,
        from: 'vietthuan98@gmail.com',
        subject: '[TEG-english] Please verify your email.',
        html: `<strong>
        <p>Hi, ${name}. Let's verify your email so you can leaning more lessons from TEG-english.</p>
        <a target="_blank" href="${link}">Click here to verify your email.</a>

        </strong>`,
    });
    console.log('result', result);
    return result;
};

export const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'vietthuan98@gmail.com',
        subject: 'Thank for joining in.',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
    });
};

export const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'vietthuan98@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
    });
};
