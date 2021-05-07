import express from 'express';

import userRoute from './modules/users/user.route';
import authRoute from './modules/auth/auth.route';
import articleRoute from './modules/articles/article.route';
import examRoute from './modules/exams/exams.route';

const Router = express.Router();
userRoute(Router);
authRoute(Router);
articleRoute(Router);
examRoute(Router);

export default Router;
