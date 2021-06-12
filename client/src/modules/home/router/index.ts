import MainLayout from "@/components/layouts/MainLayout.vue";

const homeRouters = {
  path: "/",
  component: MainLayout,
  children: [
    {
      path: "/home",
      component: () => import("@/modules/home/pages/HomePage.vue"),
      meta: {
        isPublic: true,
      }
    }
  ]
};

export default homeRouters;
