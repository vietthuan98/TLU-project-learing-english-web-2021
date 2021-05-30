import { getHomeList } from './home.controller';

const homeRoute = (router) => {
    router.get('/home', getHomeList);
};

export default homeRoute;
