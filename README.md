# littleSwanCRM

> A Vue.js project

**注意：该项目使用 element-ui@2.0.0+ 版本，所以最低兼容 vue@2.5.0**

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build:prod

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

## 目录结构
```shell
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                         // 所有请求
│   ├── assets                      // 主题 图片 icon等静态资源
│   ├── components                  // 全局公用组件
│   ├── directive                   // 全局指令
│   ├── filtres                     // 全局 filter
│   ├── mixins                      // 全局 mixins
│   ├── router                      // 路由
│   ├── store                       // 全局 store
│   ├── styles                      // 全局样式
│   ├── utils                       // 全局公用方法
│   ├── views                       // 页面
│   │    ├──login                       // 登录
│   │    ├──Home                        // 首页
│   │    ├──ErrorPage                   // 错误页（404等）
│   │    ├──Layout                      // 布局
│   │    │    ├──index                      // 主要布局（有下级菜单）
│   │    │    ├──HomeLayout                 // 只有一级菜单使用的布局
│   │    │    ├──NavHeader                  // 主页面头部：logo以及一级菜单
│   │    │    ├──BodyHeader                 // 页面内容区的头部（没有下级菜单的也没有这个部分）
│   │    │    └──SecondMenu                 // 下级菜单
│   ├── App.vue                     // 入口页面
│   ├── main.js                     // 入口js 初始化 加载组件等
├── static                     // 第三方不打包资源（原样复制到服务器上面）
├── .babelrc                   // babel-loader 配置
├── .edtorconfig               // 编辑器配置
├── .eslintignore              // eslint 忽略项
├── .eslintrc.js               // eslint 配置项
├── .gitignore                 // git 忽略项
├── .postcssrc.js              // postcss 配置项
├── index.html                 // html模板
├── favicon.ico                // favicon图标
├── package.json               // package.json
└── README                     // 项目说明

```  

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
