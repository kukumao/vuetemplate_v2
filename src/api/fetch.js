import axios from 'axios';
import { Message } from 'element-ui';
import router from '@/router';

let configParam = {
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000, // 请求超时时间
  // withCredentials: true
};

// 创建axios实例
export const fetch = axios.create(configParam);

// request拦截器
fetch.interceptors.request.use(config => {
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// respone拦截器
fetch.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code === 100 || res.code === 99) {
      Message({
        message: '您未登录或登录状态已过期，请重新登录',
        type: 'error',
        duration: 3000
      });
      router.push({ name: 'login' });
    } else if (res.code === 1008) {
      router.push({ name: 'login' });
    }
    return response.data;
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5000
    });
    return Promise.reject(error);
  }
);

export default fetch;
