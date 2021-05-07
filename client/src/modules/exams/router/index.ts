import MainLayout from "@/components/layouts/MainLayout.vue";

const examRouters = {
    path: "/",
    component: MainLayout,
    children: [
        {
            path: "/examples",
            component: () => import("@/modules/exams/pages/ExamListPage.vue")
        },
    ]
};

export default examRouters;
