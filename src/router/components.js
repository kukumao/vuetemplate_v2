/** 集中加载页面组件（懒加载方式） */
/** 通用页面组件 */
/* eslint-disable */
// 一级布局
export const Layout = () => import('@/views/Layout');

// 头部区（logo、一级菜单）
export const NavHeader = () => import('@/views/Layout/NavHeader');
// 二级菜单
export const SecondMenu = () => import('@/views/Layout/SecondMenu');
// 页面标题
export const BodyHeader = () => import('@/views/Layout/BodyHeader');
// 详情页，三级内页
export const DetailLayout = () => import('@/views/Layout/DetailLayout');

// 登录
export const Login = () => import('@/views/Login');
// 错误页面
export const ErrorPage = () => import('@/views/ErrorPage');

/** 专有页面组件 */
/** -------------------- 菜单一 ---------------------- */
// 菜单1.1的列表
export const MemberListIndex = () => import('@/views/MemberManagement/MemberList/List');

/** -------------------- 菜单二 ---------------------- */
// 菜单2.1的列表表
export const SignList = () => import('@/views/ActivityCenter/Sign/List');


