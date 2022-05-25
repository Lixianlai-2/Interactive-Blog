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
import store from "../store";

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
    component: createPage,
    // 只有经过身份验证的用户才能创建帖子
    meta: { requireAuth: true }
  },
  {
    path: "/user/:blogId",
    component: User
  },
  {
    path: "/edit/:blogId",
    component: Edit,
    // 只有经过身份验证的用户才能编辑帖子
    meta: { requireAuth: true }
  },
  {
    path: "/my",
    component: My,
    // 只有经过身份验证的用户才能访问自己的内容
    meta: { requireAuth: true }
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
    path: "/detail/:blogId",
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

router.beforeEach((to, from, next) => {
  // 如果matched的标准化路由数组中，有一个标准化路由记录的meta中的requireAuth为真，那么就执行下面的函数
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 如果用户没有登录
    if (!store.getters.isLogin) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
    // 如果是不需要登录的，那么直接进行下一步
  } else {
    next(); // 确保一定要调用next()
  }
});

export default router;
