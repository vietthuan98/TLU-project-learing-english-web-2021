import AuthLayout from "@/components/layouts/AuthLayout.vue";
import MainLayout from "@/components/layouts/MainLayout.vue";

const publicAuthRouters = {
  path: "/",
  component: AuthLayout,
  children: [
    {
      path: "/login",
      component: () => import("@/modules/auth/pages/LoginPage.vue"),
      meta: {
        isPublic: true
      }
    },
    {
      path: "/register/verify-email",
      component: () => import("@/modules/auth/pages/VerifyEmailPage.vue"),
      meta: {
        isPublic: true
      }
    },
    {
      path: "/register",
      component: () => import("@/modules/auth/pages/RegisterPage.vue"),
      meta: {
        isPublic: true
      }
    },
  ]
};

const privateAuthRouters = {
  path: "/",
  component: MainLayout,
  children: [
    {
      path: "/profile",
      component: () => import("@/modules/auth/pages/ProfilePage.vue"),
      meta: {
        isPublic: false
      }
    },
  ]
};

export { publicAuthRouters, privateAuthRouters };
