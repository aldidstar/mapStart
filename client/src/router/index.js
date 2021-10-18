import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import GMap from "../views/GMap.vue";

const routes = [
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  },

  {
    path: "/map",
    component: GMap,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
