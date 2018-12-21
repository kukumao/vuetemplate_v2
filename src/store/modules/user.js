import { getSession, setSession } from '@/utils';
import {
  USER_SET_AUTO_LIST,
  USER_SET_NEW_AUTO_TYPE,
} from '../mutation-types';

// 状态
const state = {
  // 用户菜单
  authList: null,
  // 当前权限身份
  newAutoType: ''
};

// 操作
const mutations = {
  // 设置用户菜单
  [USER_SET_AUTO_LIST](state, array) {
    state.authList = array;
    setSession('authList', array);
  },
  // 当前权限身份
  [USER_SET_NEW_AUTO_TYPE](state, obj) {
    state.newAutoType = obj;
    setSession('newAutoType', obj);
  }
};

// 方法
const actions = {
  // 设置用户菜单
  setAuthMenu({ commit }, authList) {
    commit('USER_SET_AUTO_LIST', authList);
  },
  // 当前权限身份
  setNewAutoTpye({ commit }, newAutoType) {
    commit('USER_SET_NEW_AUTO_TYPE', newAutoType);
  }
};

const getters = {
  // 用户菜单
  authList: state => state.authList || getSession('authList'),
  // 当前权限身份
  newAutoType: state => state.newAutoType || getSession('newAutoType'),
};

export default {
  // 开启命名空间
  namespaced: true,
  getters,
  state,
  mutations,
  actions
};
