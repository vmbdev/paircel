import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/VehicleList.vue'),
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateVehicle.vue'),
    },
    {
      path: '/history/:carId?',
      name: 'history',
      component: () => import('../views/History.vue'),
    },
    {
      path: '/edit/:carId',
      name: 'edit',
      component: () => import('../views/EditVehicle.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
    },
    {
      path: '/park',
      name: 'park',
      component: () => import('../views/Park.vue'),
    },
  ],
});

export default router;
