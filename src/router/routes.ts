import type { RouteRecordRaw } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "Layout",
    component: () => import("../layouts/Layout.vue"),
    meta: { title: "Base" },
    children: [
      {
        path: "",
        name: "HomeView",
        component: () => import("../views/HomeView.vue"),
        meta: { title: "Home" },
      },
      {
        path: "about",
        name: "AboutView",
        component: () => import("../views/AboutView.vue"),
        meta: { title: "About" },
      },
    ],
  },
  {
    path: "/app",
    name: "AppLayout",
    component: () => import("../layouts/AppLayout.vue"),
    meta: { title: "App" },
    children: [
      {
        path: "",
        name: "AppView",
        component: () => import("../views/AppView.vue"),
        meta: { title: "App Home", authReqired: true },
      },
      {
        path: "",
        name: "AppLoader",
        component: () => import("../views/AppLoader.vue"),
        meta: { title: "App Loader" },
      },
    ],
  },
] as RouteRecordRaw[];
