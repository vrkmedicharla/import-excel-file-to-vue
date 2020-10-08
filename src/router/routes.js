import home from 'pages/home'
import mainPage from 'pages/mainPage'
const routes = [
    // {
    //   path: '/',
    //   component: () => import('layouts/MainLayout.vue'),
    //   children: [
    //     { path: '', component: () => import('pages/Index.vue') }
    //   ]
    // },
    {
        path: "/",
        component: home
    },
    {
        path: '/mainPage',
        component: mainPage
    },


    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: () =>
            import ('pages/Error404.vue')
    }
]

export default routes