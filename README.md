# 商城后台管理系统——前端部分

这个项目使用React进行开发。

## 项目目录结构

```
src                            这是源代码的根目录
│  App.css                     应用的主要 CSS 文件
│  App.js                      App组件文件
│  index.css                   应用的全局 CSS 文件
│  index.js                    应用的入口文件
│
├─components                   包含了所有的 React 组件
│  │  DashBoard.js             页面布局组件
│  │  Home.js                  首页组件
│  │  Login.js                 登录组件
│  │  NotFound.js              404页面组件
│  │  Register.js              注册组件
│  │
│  ├─auth                      该目录包含与权限管理相关的组件
│  │      MenuPage.js          菜单管理组件
│  │      ResourcePage.js      资源管理组件
│  │      RolePage.js          角色管理组件
│  │      UserPage.js          用户管理组件
│  │
│  ├─order                     该目录包含与订单相关的组件
│  │      OlistPage.js         订单列表组件
│  │      SetPage.js           订单设置组件
│  │
│  ├─product                   该目录包含了与商品相关的组件
│  │      CategoryPage.js      商品分类组件
│  │      PlistPage.js         商品列表组件
│  │
│  └─sms                       该目录包含了与营销相关的组件
│          CouponPage.js       优惠券列表组件
│          SeckillPage.js      秒杀活动列表组件
│
├─routes                       该目录包含了与路由相关的组件
│      index.js                路由表
│      RouteGuard.js           路由守卫
│
└─utils                        该目录包含了工具类
        HttpService.js         Http请求工具类
```

## 使用的插件

- **react-router-dom**: 用于实现前端路由功能
- **axios**: 用于发送 HTTP 请求
- **antd**: 用于构建用户界面的组件库
- **react-icons**: 用于添加图标
- **react-hook-form**: 用于处理表单验证和提交
- **moment**: 用于处理日期和时间
- **lodash**: 用于提供实用的 JavaScript 工具函数
- **classnames**: 用于动态生成 CSS 类名
- **react-router-config**: 用于配置路由
- **react-helmet-async**: 用于管理文档头部的内容

## 组件使用说明

本项目的所有组件基于`Ant Design`组件库进行构建，所以请确保您的项目安装了该组件库。

## 项目运行启动方式

首先运行
`npm install`
安装必要的依赖，

在项目工作目录下，运行命令行，输入以下命令：

### `npm start`

在开发模式下运行应用。
在浏览器中打开 http://localhost:3000 来查看它。

或者运行

### `npm run build`

生成`/build`目录，

1. 全局安装本地服务包 `npm i -g serve` 该包提供了`serve`命令，用来启动本地服务器。
2. 在项目根目录中执行命令 `serve -s ./build` 在`build`目录中开启服务器。
3. 在浏览器中访问：http://localhost:3000/ 预览项目。
