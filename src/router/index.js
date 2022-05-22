import Vue from "vue";
import VueRouter from "vue-router";
import login from "../pages/Login.vue";
import createPage from "../pages/CreatePage.vue";
import User from "../pages/User.vue";
import Edit from "../pages/Edit.vue";
import My from "../pages/My.vue";
import Index from "../pages/Index.vue";
import NotFound from "../pages/NotFound.vue";
import Register from "../pages/Register.vue";
import Detail from "../pages/Detail.vue";

Vue.use(VueRouter);

const routes = [
  {
    // 设置默认路径
    path: "/",
    // Index为首页
    component: Index
  },
  {
    path: "/login",
    component: login
  },

  {
    path: "/createPage",
    component: createPage
  },
  {
    path: "/user",
    component: User
  },
  {
    path: "/edit",
    component: Edit
  },
  {
    path: "/my",
    component: My
  },
  {
    path: "/index",
    component: Index
  },

  {
    path: "/register",
    component: Register
  },
  {
    path: "/detail",
    component: Detail
  },

  {
    path: "*",
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;
