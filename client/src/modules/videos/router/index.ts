import MainLayout from "@/components/layouts/MainLayout.vue";

const videoRouters = {
  path: "/",
  component: MainLayout,
  children: [
    {
      path: "/videos",
      component: () => import("@/modules/videos/pages/VideoListPage.vue")
    },
    {
      path: "/videos/upload",
      component: () => import("@/modules/videos/pages/VideoUploadPage.vue")
    },
    {
      path: "/videos/:id",
      component: () => import("@/modules/videos/pages/VideoDetailPage.vue")
    },
  ]
};

export default videoRouters;
