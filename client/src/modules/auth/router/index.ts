import AuthLayout from "@/components/layouts/AuthLayout.vue";

const authRouters = {
  path: "/",
  component: AuthLayout,
  children: [
    {
      path: "/login",
      component: () => import("@/modules/auth/pages/LoginPage.vue")
    },
    {
      path: "/register",
      component: () => import("@/modules/auth/pages/RegisterPage.vue")
    }
  ]
};

export default authRouters;
