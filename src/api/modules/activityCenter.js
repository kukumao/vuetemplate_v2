// 菜单二
import fetch from '../fetch';

import {
  GET_SIGN_LIST
} from '../url';

// 查询列表
function getSignActivityList(data) {
  return fetch({
    url: GET_SIGN_LIST,
    method: 'post',
    data: data
  });
}

const activityCenter = {
  getSignActivityList
};

export { activityCenter };
