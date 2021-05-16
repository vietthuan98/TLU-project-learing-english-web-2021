import MainLayout from "@/components/layouts/MainLayout.vue";

const articleRouters = {
  path: "/",
  component: MainLayout,
  children: [
    {
      path: "/articles",
      component: () => import("@/modules/articles/pages/ArticleListPage.vue")
    },
    {
      path: "/articles/:id",
      component: () => import("@/modules/articles/pages/ArticleDetailPage.vue")
    }
  ]
};

export default articleRouters;
