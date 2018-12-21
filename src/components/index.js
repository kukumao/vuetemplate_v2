/*
 * File: components.js
 * Project: <<scrm>>
 * File Created: 2018-5-31 10:57:39 AM
 * Author: xiongyang (yang.xiong@meicloud.com)
 * -----
 * Last Modified: 2018-07-03 4:56:27 pm
 * Modified By: xiongyang (yang.xiong@meicloud.com>) (<<git>>)
 * -----
 * Copyright © 2018 - MeiCloud, MeiCloud
 */

import Vue from 'vue';

// 列表树
import TreeGrid from './TreeGrid';
// 搜索栏
import QueryBar from './QueryBar';
// 搜索组件
import McQuery from './McQuery';
// 分页组件
import McPagination from './McPagination';
// 表格组件
import McTable from './McTable';

Vue.component(TreeGrid.name, TreeGrid);
Vue.component(QueryBar.name, QueryBar);
Vue.component(McQuery.name, McQuery);
Vue.component(McPagination.name, McPagination);
Vue.component(McTable.name, McTable);
