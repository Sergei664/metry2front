import Vue from 'vue'
import VueRouter from 'vue-router';
import Login from './components/Login.vue';
import LkMain from './components/LkMain.vue';
import {store} from './store'

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
    } else {
        next('/');
    }
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
    } else {
        next('/login');
    }
};

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'LkMain',
            component: LkMain,
            beforeEnter: ifAuthenticated,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: ifNotAuthenticated,
            meta: {
                guest: true
            }
        },
    ],
})