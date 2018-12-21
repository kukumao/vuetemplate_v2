export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return timeStr;
}

export function formatTime(val, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (!val) return;
  val = new Date(val);
  var o = {
    'M+': val.getMonth() + 1, // 月份
    'd+': val.getDate(), // 日
    'h+': val.getHours(), // 小时
    'm+': val.getMinutes(), // 分
    's+': val.getSeconds(), // 秒
    'q+': Math.floor((val.getMonth() + 3) / 3), // 季度
    'S': val.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (val.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
}

// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf('?') + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0;
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/ig) != null) {
      len += 1;
    } else { len += 0.5 }
  }
  return Math.floor(len);
}

export function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

export function param(json) {
  if (!json) return '';
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) return '';
    return encodeURIComponent(key) + '=' +
      encodeURIComponent(json[key]);
  })).join('&');
}

export function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}

export function html2Text(val) {
  const div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  for (const property in source) {
    if (source.hasOwnProperty(property)) {
      const sourceProperty = source[property];
      if (typeof sourceProperty === 'object') {
        target[property] = objectMerge(target[property], sourceProperty);
        continue;
      }
      target[property] = sourceProperty;
    }
  }
  return target;
}

export function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  const difference = to - element.scrollTop;
  const perTick = difference / duration * 10;
  setTimeout(() => {
    // console.log(new Date());
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += '' + className;
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}

export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date();
      const start = new Date(new Date().toDateString());
      end.setTime(start.getTime());
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString());
      const start = new Date();
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString());
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString());
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      picker.$emit('pick', [start, end]);
    }
  }];

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90;
  } else {
    return new Date(new Date().toDateString());
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function(...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone');
  }
  const targetObj = source.constructor === Array ? [] : {};
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}

/** ----- 日期相关 ------- */
export const date = {
  /** 由时间字符串获得日期对象(固定年月日为2018.01.01) */
  getTime(timeStr) {
    if (typeof timeStr === 'string') {
      const reg = /(\d{2})[.:-](\d{2})[.:-](\d{2})/;

      const match = timeStr.match(reg);
      const timeArr = match.slice(1, 4);

      return new Date(2018, 0, 1, ...timeArr);
    }
  },
  /** 由日期对象获取时间字符串(丢弃年月日) */
  getTimeStr(timeDate) {
    const separate = ':';
    const hours = timeDate.getHours();
    const minutes = timeDate.getMinutes();
    const seconds = timeDate.getSeconds();
    const getStr = num => (num < 10) ? ('0' + num) : ('' + num);
    const timeStr = getStr(hours) + separate + getStr(minutes) + separate + getStr(seconds);

    return timeStr;
  },
};

/** --------- sessiion相关 ----------- */
// 存、取、删除sessionStorage辅助函数
export const setSession = (key, value) => {
  const tarString = JSON.stringify(value);
  window.sessionStorage.setItem(key, tarString);
};

export const getSession = (key) => {
  const valueStr = window.sessionStorage.getItem(key);
  if (valueStr) {
    return JSON.parse(valueStr);
  }
  return false;

};
export const removeSession = (key) => {
  window.sessionStorage.removeItem(key);
};
/** --------- 业务相关 ----------- */
// 截取前面9个数据，其余的放到新数据“其它”中；
export const nineList = (list) => {
  let newList = [];
  if (list.length > 10) {
    let nine = list.slice(0, 9);
    let others = list.splice(9, list.length);
    let otherNum = others.reduce(function(prev, cur) {
      return cur.member + prev;
    }, 0);
    let ten = {
      member: otherNum,
      memberSourceName: '其它'
    };
    nine.push(ten);
    newList = nine;
  } else {
    newList = list;
  };
  return newList;
};
/**
 * 丢掉 ‘_’开头的参数
 * 并把 abc__list[]-》{a,b,c}(以逗号隔开)
 * 过滤空参数
 * zz_开始的为日期对象，处理为毫秒后，属性名去掉zz
 */
export const filterParam = (pm) => {
  let rsPm = {};
  for (let key in pm) {
    if (pm[key] && pm[key] !== '' && key !== 'total') {

      if (key.indexOf('__') > 0) {
        // TODO 改用正则
        if (pm[key].length > 0) {
          // book__list =[1,2] ==> book='{1,2}';
          rsPm[key.substring(0, key.indexOf('__'))] = pm[key].join(',');
        }
      } else if (key.startsWith('_')) {
        continue;
      } else if (key.startsWith('zz_')) {
        // zz开始的为日期对象，处理为毫秒后，属性名去掉zz
        rsPm[key.substring(3)] = typeof pm[key] === 'number' ? pm[key] : pm[key].getTime();
      } else {
        rsPm[key] = pm[key];
      }
      // delete pm[key]

    }
  }
  return rsPm;
};
// 保留小数点后两位
export const toFixedTwo = (num) => {
  let rsNum = num;
  var idx = String(num).indexOf('.') + 1; // 获取小数点的位置
  var count = String(num).length - idx; // 获取小数点后的个数
  if (idx > 0 && count > 2) {
    rsNum = rsNum.toFixed(2);
  }
  return rsNum;
};
// 数组深复制
export const copyArr = (arr) => {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(JSON.parse(JSON.stringify(arr[i])));
  }
  return res;
};
export const formatTimeV2 = (time) => {
  let date = new Date(time);
  let [year, month, day, hour, minute, second] = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  if (hour < 10) hour = '0' + hour;
  if (minute < 10) minute = '0' + minute;
  if (second < 10) second = '0' + second;
  let value = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  return value;
};