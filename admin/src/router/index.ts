import { createRouter, createWebHashHistory } from 'vue-router';
import Main from '@/views/Main.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        // {
        //   name: 'course-list',
        //   path: '/course/list',
        //   component: () => import('@/views/courses/CourseList.vue')
        // }
        {
          name: 'course-list',
          path: '/course/list',
          component: () => import('@/views/courses/CourseList.vue')
        },
        {
          name: 'episode-list',
          path: '/episode/list',
          component: () => import('@/views/episode/EpisodeList.vue')
        },
        {
          name: 'user-list',
          path: '/user/list',
          component: () => import('@/views/user/UserList.vue')
        }
      ]
    }
  ]
});

export default router;
