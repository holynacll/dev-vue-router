import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import sourceData from "@/data.json";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/protected",
    name: "protected",
    component: () => import("@/views/ProtectedView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/invoices",
    name: "invoices",
    component: () => import("@/views/InvoicesView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/destination/:id/:slug",
    name: "destination.show",
    component: () =>
      import(
        /* webpackChunkName: "destination:id" */ "@/views/DestinationShow.vue"
      ),
    props: true,
    beforeEnter(to) {
      const exists = sourceData.destinations.find(
        (destination) => destination.id === parseInt(to.params.id)
      );
      if (!exists)
        return {
          name: "NotFound",
          params: { pathMatch: to.path.split("/").slice },
        };
    },
    children: [
      {
        path: ":experienceSlug",
        name: "experience.show",
        component: () =>
          import(
            /* webpackChunkName: ":experienceSlug" */ "@/views/ExperienceShow.vue"
          ),
        props: true,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "@/components/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return (
      savedPosition ||
      new Promise((resolve) => {
        setTimeout(() => resolve({ top: 0, behavior: "smooth" }), 300);
      })
    );
  },
});
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !window.user) {
    return { name: "login" };
  }
});
export default router;
