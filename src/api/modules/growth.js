// 菜单一
import fetch from '../fetch';

import {
  GROWTH_UPDATE_LIST
} from '../url';

// 获取列表
function getGrowthUpdateList(data) {
  return fetch({
    url: GROWTH_UPDATE_LIST,
    method: 'post',
    data: data
  });
}

const growth = {
  getGrowthUpdateList
};

export { growth };
