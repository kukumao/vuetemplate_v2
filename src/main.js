// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'normalize.css';// A modern alternative to CSS resets
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss'; // global css
import '@/styles/fonts/iconfont.css'; // 字体图标库

import App from './App';
import router from './router';
import store from './store';
import './directive'; // 全局自定义指令
import './components'; // 全局自定义组件
import * as filters from './filters'; // global filter

// 引入echarts
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// 自定义Array的indexOf方法
if (!Array.indexOf) {
  Array.prototype.indexOf = el => {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === el) {
        return i;
      }
    }
    return -1;
  };
};

// 使用element-ui
Vue.use(Element);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
