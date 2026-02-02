import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/DashboardPage.vue'),
        name: 'home',
      },
      {
        path: '/tasks',
        component: () => import('pages/TasksListPage.vue'),
        name: 'tasks',
      },
      {
        path: '/categories',
        component: () => import('pages/CategoriesListPage.vue'),
        name: 'categories',
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
