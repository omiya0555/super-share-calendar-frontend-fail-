import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/LoginForm.vue';
import Home  from '../views/AppHome.vue';

const routes = [
    {
        path: '/login',
        name: 'LoginForm',
        component: Login,
    },
    {
        path: '/',
        name: 'AppHome',
        component: Home,
        meta: {requiresAuth: true},
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

// ナビゲーションガードの設定
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('auth_token');
    if(to.matched.some(record=> record.meta.requiresAuth) && !isAuthenticated){
        next('/login');
    } else {
        next();
    }
});

export default router;