// 菜单
import fetch from '../fetch';

import {
  MENU_AUTH_MEMULIST,
  MENU_AUTH_MENULIST
} from '../url';

/**
 * 获取权限列表
 * @param  {Object} data  表单
 * @return {Promise}      返回请求的Promise
 */
function getAuthMenulist(data) {
  return fetch({
    url: MENU_AUTH_MEMULIST,
    method: 'get',
    params: data
  });
};

/**
 * 获取左侧导航
 * @param  {Object} data  表单
 * @return {Promise}      返回请求的Promise
 */
function getleftAuthlist(data) {
  return fetch({
    url: MENU_AUTH_MENULIST,
    method: 'get',
    params: data
  });
};

const menu = {
  getAuthMenulist,
  getleftAuthlist
};

export { menu };
