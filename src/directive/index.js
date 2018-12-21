import Vue from 'vue';

// document监听enter事件
import AutoEnter from './autoEnter/index';

const install = function(Vue) {
  Vue.directive('yxyEnter', AutoEnter);
};

Vue.use(install); // eslint-disable-line
