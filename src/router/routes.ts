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
        name: "AgendaView",
        component: () => import("../views/AgendaView.vue"),
        meta: { title: "Agenda" },
      },
      {
        path: "notes",
        name: "NotesView",
        component: () => import("../views/NotesView.vue"),
        meta: { title: "Notes" },
      },
      {
        path: "challenges",
        name: "ChallengesView",
        component: () => import("../views/ChallengesView.vue"),
        meta: { title: "Challenges" },
      },
      {
        path: "about",
        name: "AboutView",
        component: () => import("../views/AboutView.vue"),
        meta: { title: "About" },
      },
    ],
  },
] as RouteRecordRaw[];
