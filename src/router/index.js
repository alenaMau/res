import {createRouter, createWebHistory} from 'vue-router'
import { useUserStore } from "../stores/user.js";
import AppFolder from "../components/AppFolder.vue";
import {storeToRefs} from "pinia";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/auth',
            name: 'auth',
            component: () => import('../views/AuthorizationView.vue')
        },
        {
            path: '/regis',
            name: 'regis',
            component: () => import('../views/RegistrationView.vue')
        },
        {
            path: '/main',
            name: 'main',
            meta: {requiresAuth: true},
            component: () => import('../views/MainView.vue')
        },
        {
            path: '/profile',
            name: 'profile',
            meta: {requiresAuth: true},
            component: () => import('../views/ProfileView.vue')
        },
        {
            path: '/addPicture',
            name: 'addPicture',
            meta: {requiresAuth: true},
            component: () => import('../views/AddPictureView.vue')
        },
        {
            path: '/editingProfile',
            name: 'editingProfile',
            meta: {requiresAuth: true},
            component: () => import('../views/EditingProfileView.vue')
        },
        {
            path: '/folder/:key',
            name: 'folder',
            meta: {requiresAuth: true},
            component: AppFolder
        },
        {
            path: '/favorite/:key',
            name: 'favorite',
            meta: {requiresAuth: true},
            component: AppFolder
        }
    ]
})



router.beforeEach((to, from) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const userStore = useUserStore()
    const { isAuth } = storeToRefs(userStore);

    if (requiresAuth && !isAuth.value) {
        return { path :"/auth" }
    }
})

export default router
