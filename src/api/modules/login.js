
// 登录
import fetch from '../fetch';

import {
  LOGIN_IS_LOGIN,
  LOGIN_LOGINING,
  LOGIN_LOGOUT
} from '../url';

/**
 * 是否已经登录
 * @param  {Object} data  表单
 * @return {Promise}      返回请求的Promise
 */
function isLoginFlag(data) {
  return fetch({
    url: LOGIN_IS_LOGIN,
    method: 'get',
    params: data
  });
};

/**
 * 登录
 * @param  {Object} data  表单
 * @return {Promise}      返回请求的Promise
 */
function logining(data) {
  return fetch({
    url: LOGIN_LOGINING,
    method: 'post',
    params: data
  });
};

/**
 * 登录
 * @param  {Object} data  表单
 * @return {Promise}      返回请求的Promise
 */
function logout(data) {
  return fetch({
    url: LOGIN_LOGOUT,
    method: 'GET',
    params: data
  });
};

const login = {
  isLoginFlag,
  logining,
  logout
};

export { login };
