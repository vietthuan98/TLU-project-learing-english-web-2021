import AuthLayout from "@/components/layouts/AuthLayout.vue";

const authRouters = {
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
    }
  ]
};

export default authRouters;
