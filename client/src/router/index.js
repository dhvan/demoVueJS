import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";
import Employees from "../views/Employees";
import CreateEmployee from "../views/CreateEmployee";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Employees",
    name: "Employees",
    component: Employees,
  },
  {
    path: "/Employees/create",
    name: "CreateEmployee",
    component: CreateEmployee,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
