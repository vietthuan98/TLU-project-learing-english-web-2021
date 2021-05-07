import MainLayout from "@/components/layouts/MainLayout.vue";

const exampleRouters = {
    path: "/",
    component: MainLayout,
    children: [
        {
            path: "/examples",
            component: () => import("@/modules/example/pages/ExampleListPage.vue")
        },
    ]
};

export default exampleRouters;
