// 公共接口
import fetch from '../fetch';

import {
  DICT_SELECT_LIST
} from '../url';

/**
 * 数据字典
 * @param  {Object} data  表单
 * @return {Promise}      返回请求的Promise
 */
function dictSelectList(data) {
  let arr = [];
  return fetch({
    url: DICT_SELECT_LIST,
    method: 'get',
    params: data
  }).then(res => {
    if (res.code === 0) {
      // 只返回已启用的数据
      if (res.data && res.data.length) {
        res.data.forEach(item => {
          if (item.enabled) {
            arr.push(item);
          }
        });
      }
      res.data = arr;
      return res;
    } else {
      return res;
    }
  });
};

const common = {
  dictSelectList
};

export { common };
