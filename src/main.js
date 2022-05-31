import Vue from "vue";
import App from "./App";
import router from "./router";
// 在main.js中引入store文件夹中的index.js（如果不写后缀，默认就是导入index.js）
import store from "./store";

// 引入并使用ElementUi
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 引入并使用util
import util from "@/helper/util";
Vue.use(util);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
