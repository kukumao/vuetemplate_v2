import * as COM from '../components';
const membetManagement = [
  /** ------------------------------ 首页 ------------------------------ */
  { path: '/home', name: 'home', redirect: '/member-list' },
  {
    path: '/member-list',
    component: COM.Layout,
    redirect: '/member-list/index',
    name: 'memberList',
    meta: { label: '菜单1.1' },
    /** ------------------------------ 二级页面 ------------------------------ */
    children: [
      // 列表
      {
        path: 'index',
        icon: 'el-icon-document',
        components: {
          bodyView: COM.MemberListIndex,
          appHeader: COM.NavHeader,
          bodyHeader: COM.BodyHeader,
          secondMenu: COM.SecondMenu
        },
        name: 'memberListIndex',
        meta: { label: '列表', icon: 'el-icon-document', menuKeyPath: '/member-list/index' }
      }
    ]
  }
];

export default membetManagement;
