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
      path: '/list',
      name: 'list',
      component: () => import('../views/VehicleList.vue'),
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateVehicle.vue'),
    },
    {
      path: '/history/:vehicleId?',
      name: 'history',
      component: () => import('../views/ParkingHistory.vue'),
    },
    {
      path: '/edit/:vehicleId',
      name: 'edit',
      component: () => import('../views/EditVehicle.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/UserSettings.vue'),
    },
    {
      path: '/park',
      name: 'park',
      component: () => import('../views/ParkMap.vue'),
    },
    {
      path: '/navigation',
      name: 'navigation',
      component: () => import('../views/MapNavigation.vue'),
      props: (route) => ({
        coords: {
          lat: route.query.lat ? +route.query.lat : null,
          lng: route.query.lng ? +route.query.lng : null,
        },
      }),
    },
  ],
});

export default router;
