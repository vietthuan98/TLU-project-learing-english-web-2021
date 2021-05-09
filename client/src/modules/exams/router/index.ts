import MainLayout from "@/components/layouts/MainLayout.vue";

const examRouters = {
    path: "/",
    component: MainLayout,
    children: [
        {
            path: "/exams",
            component: () => import("@/modules/exams/pages/ExamListPage.vue")
        },
        {
            path: "/exams/:id",
            component: () => import("@/modules/exams/pages/ExamDetailPage.vue")
        },
    ]
};

export default examRouters;
