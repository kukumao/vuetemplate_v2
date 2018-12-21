import * as COM from '../components';
const activityCenter = [
  /** ------------------------------ 活动中心 ------------------------------ */
  {
    path: '/activity-list',
    component: COM.Layout,
    redirect: '/activity-list/index',
    name: 'activityList',
    meta: { label: '菜单2.1' },
    /** ------------------------------ 二级页面 ------------------------------ */
    children: [
      // 列表
      {
        path: 'index',
        icon: 'el-icon-document',
        components: {
          bodyView: COM.SignList,
          appHeader: COM.NavHeader,
          bodyHeader: COM.BodyHeader,
          secondMenu: COM.SecondMenu
        },
        name: 'activityListIndex',
        meta: { label: '列表', icon: 'el-icon-document', menuKeyPath: '/activity-list/index' }
      }
    ]
  },
];

export default activityCenter;
