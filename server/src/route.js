import express from 'express';

import userRoute from './modules/users/user.route';
import authRoute from './modules/auth/auth.route';
import articleRoute from './modules/articles/article.route';
import videoRoute from './modules/videos/video.route';
import examRoute from './modules/exams/exams.route';
import homeRoute from './modules/home/home.route';

const Router = express.Router();
userRoute(Router);
authRoute(Router);
articleRoute(Router);
examRoute(Router);
videoRoute(Router);
homeRoute(Router);

export default Router;
