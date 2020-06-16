import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/products/create',
      name: 'productform',
      // lazy-loaded
      component: () => import('./views/ProductForm.vue')
    },
    {
      path: '/product/:id',
      name: 'productpage',
      // lazy-loaded
      component: () => import('./views/ProductPage.vue')
    },
    {
      path: '/access/401',
      name: 'accesserror',
      // lazy-loaded
      component: () => import('./views/AccessError.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      // lazy-loaded
      component: () => import('./views/Cart.vue')
    },
    {
      path: '/myorders',
      name: 'myorders',
      // lazy-loaded
      component: () => import('./views/MyOrders.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      // lazy-loaded
      component: () => import('./views/Orders.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('./views/BoardAdmin.vue')
    },
    {
      path: '/mod',
      name: 'moderator',
      // lazy-loaded
      component: () => import('./views/BoardModerator.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    }
  ]
});

