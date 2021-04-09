import MainLayout from '@/components/layouts/MainLayout.vue';

const articleRouters = {
    path: '/',
    component: MainLayout,
    children: [
        {
            path: '/articles',
            component: () => import('@/modules/articles/pages/ArticlePage.vue')
        },
    ]
}

export default articleRouters;