import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes/index';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条样式

// 使用路由组件
Vue.use(VueRouter);

// 创建路由
const router = new VueRouter({
  // mode: 'history',    // 路由的模式
  // base: __dirname,
  scrollBehavior: (to) => {
    if (to.hash) {
      return {
        selector: to.hash,
      };
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: routes
});

router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
  // 页面title
  document.title = to.meta.label || '没有就xxx';
  next();
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

export default router;
