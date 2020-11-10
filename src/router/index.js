import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../components/Tabs.vue'

const routes = [
  // {
  //   path: '/',
  //   component: () => import('@/views/Home.vue')
  // },
  // {
  //   path: '/profile',
  //   component: () => import('@/views/Profile.vue')
  // },
  // {
  //   path: '/list',
  //   component: () => import('@/views/List.vue')
  // },

  // add /privacy-policy route for google calendar api
  // add /terms-of-service route for google calendar api
  {
    path: '/',
    name: "conferences",
    component: Tabs,
    children: [
      {
        path: '/',
        name: "conferences",
        component: () => import('@/views/Home.vue'),
        meta: {
          requiresAuth: false,
        }
      },
      {
        path: '/venues',
        name: "venues",
        component: () => import('@/views/Venues.vue'),
        meta: {
          requiresAuth: false,
        }
      },
      {
        path: '/speakers',
        name: "speakers",
        component: () => import('@/views/Speakers.vue'),
        meta: {
          requiresAuth: false,
        }
      },

      // Maybe this must be its own top-level route?
      {
        path: '/login',
        component: () => import('@/views/Login.vue'),
        meta: {
          requiresAuth: false,
        }
      },

      // Maybe this must be its own top-level route?
      {
        path: '/register',
        component: () => import('@/views/Register.vue'),
        meta: {
          requiresAuth: false,
        }
      },

      // Maybe this must be its own top-level route?
      {
        path: '/create-venue',
        component: () => import('@/views/CreateVenue.vue'),
        meta: {
          requiresAuth: true,
        }
      },

      // Maybe this must be its own top-level route?
      {
        path: '/profile',
        component: () => import('@/views/Profile.vue'),
        meta: {
          requiresAuth: true,
        }
      },
      
      // Maybe this must be its own top-level route?
      {
        path: '/create-event',
        component: () => import('@/views/CreateEvent.vue'),
        meta: {
          requiresAuth: true,
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
