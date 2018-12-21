// 使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。
// 这样可以使 linter 之类的工具发挥作用，
// 同时把这些常量放在单独的文件中
// 可以让你的代码合作者对整个 app 包含的 mutation 一目了然：

/** user.js */
// 权限菜单
export const USER_SET_AUTO_LIST = 'USER_SET_AUTO_LIST';
// 当前权限身份
export const USER_SET_NEW_AUTO_TYPE = 'USER_SET_NEW_AUTO_TYPE';
