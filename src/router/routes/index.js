import * as COM from '../components';
// 菜单一
import membetManagement from './memberManagement';
// 菜单二
import activityCenter from './activityCenter';

/**
 * 不对布局进行扩展的话，路由只能配到2级，但是不影响菜单有3级
 * redirect: path                 重定位
 * name:'router-name'             路由名，必须
 * meta : {                       路由元信息，该字段必须存在
    label: 'string',              菜单显示的文本
    icon: 'class-name',           菜单图标类名
  }
 **/
export const routes = [
  /** ------------------------------ 一级页面 ------------------------------ */
  { path: '/login', component: COM.Login, meta: {}, name: 'login' },
  { path: '/404', component: COM.ErrorPage, meta: {}, name: 'error404' },
  { path: '/', redirect: '/login' },
  ...membetManagement,
  ...activityCenter,
  { path: '*', redirect: '/', meta: { hidden: true } }
];
export default routes;
