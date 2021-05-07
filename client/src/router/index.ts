import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import authRouters from "@/modules/auth/router";
import homeRouters from "@/modules/home/router";
import articleRouters from "@/modules/articles/router";
import commonRouters from "@/modules/common/router";
import examRouters from "@/modules/exams/router";

import TokenServices from "@/helpers/token";
import intersection from "lodash/intersection";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/home"
  },
  { path: "*", redirect: "/errors/404" },
  authRouters,
  homeRouters,
  articleRouters,
  commonRouters,
  examRouters
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const isPrivate = to?.meta?.private || false;
  const loggedIn = TokenServices.getUser();

  // if (isPrivate && !loggedIn) {
  //   return next('/');
  // }

  // if (loggedIn) {
  //   //TODO: check permission
  //   const roles = to?.meta?.roles || [];
  //   const userType = TokenServices.getUserType();
  //   if (!intersection(roles, userType).length) {
  //     return next('/error/403')
  //   }
  // }
  return next();
});

export default router;
