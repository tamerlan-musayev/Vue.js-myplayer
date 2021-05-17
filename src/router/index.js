import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../components/Main.vue"),
  },
  {
    path: "/music",
    component: () => import("../components/Music.vue"),
  },
  {
    path: "/video",
    component: () => import("../components/Video.vue"),
  },
  {
    path: "/photos",
    component: () => import("../components/Photos.vue"),
  },
  {
    path: "/clock",
    component: () => import("../components/Clock.vue"),
  },
  {
    path: "/goals",
    component: () => import("../components/Goals.vue"),
  },
  {
    path: "/profile",
    component: () => import("../components/Profile.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
