import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { guestConfirmation } from '../helpers/functions';
import TokenServices from "@/helpers/token";

import { publicAuthRouters, privateAuthRouters } from "@/modules/auth/router";
import homeRouters from "@/modules/home/router";
import articleRouters from "@/modules/articles/router";
import commonRouters from "@/modules/common/router";
import examRouters from "@/modules/exams/router";
import videoRouters from "@/modules/videos/router";


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/index.html",
    redirect: "/home"
  },
  { path: "*", redirect: "/errors/404" },
  publicAuthRouters,
  privateAuthRouters,
  homeRouters,
  articleRouters,
  commonRouters,
  examRouters,
  videoRouters
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const isPublic = to?.meta?.isPublic || false;
  const loggedIn = !!TokenServices.getToken();

  if (!isPublic && !loggedIn) {
    //show popup check confirm LOGIN or HOME page
    const { isConfirmed: register, isDenied: login, isDismissed: cancel } = await guestConfirmation();
    if (register) return next({ path: '/register' });
    if (login) return next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
    if (cancel) return;
  }

  if (loggedIn) {
    //TODO: check permission
    // const roles = to?.meta?.roles || [];
    // const userType = TokenServices.getUserType();
    // if (!intersection(roles, userType).length) {
    //   return next('/error/403')
    // }
  }
  return next();
});

export default router;
