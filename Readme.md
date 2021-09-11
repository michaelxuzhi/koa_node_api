# 一、项目的的初始化

## 1 npm 初始化 

`npm init -y`

生成`package.json`文件

- 记录项目的依赖

## 2 git初始化

`git init`

生成`git`隐藏文件夹，git的本地仓库

## 3 创建Readme

项目指引

# 二、搭建项目

## 1 安装Koa框架

`npm i koa`

## 2 编写最基本的app

```js
// 导入Koa类
const Koa = require('koa');

// 实例化一个对象
const app = new Koa();

// 使用中间件
app.use((ctx, next) => {
  ctx.body = 'Hello Koa from main.js';
});

// 监听3000端口，对端口的所有http请求做出对应的回调响应
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000');
});
```

## 3 测试

在终端，输入`node src/main.js` 开启服务

# 三、优化

## 1 起服务的优化

- 使用node起服务，每次修改后，需要重启服务，为了做到保存时，免于手动重启，将node 改为 nodemon，由nodemon来监听文件的改变，自动重启服务

- `npm i nodemon` 只是装了package，需要配置对应的脚本来使用

  ```js
  // 在packa.json的scripts下，配置脚本   
  "dev": "nodemon ./src/main.js",
      
  // 在控制台使用npm run dev 就起服务了
  ```

  ![image-20210905153304973](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210905153304973.png)

## 2 读取配置文件

- 安装 `npm i dotenv`

```js
npm i dotenv
```

- 根目录下创建`.env`文件，里面是环境配置的信息

  ```js
  APP_PORT = 3000
  ```

  

- 在`src`目录下创建不同的配置文件：主要是为了区别开来

  - config.default.js是默认的，生产环境
  - config.dev.js是开发环境的

## 3 导入dotenv，导出配置信息对象

- 在`config.default.js`中导入dotenv

  ```js
  // 导入
  const dotenv = require("dotenv");
  
  // 启动配置（官方默认）
  dotenv.config();
  
  // 获取.env的配置信息
  console.log(process.env.APP_PORT);
  
  // process.env是官方默认的配置信息对象，读取的就是.env的内容
  
  // 再将配置信息对象导出
  module.exports = process.env;
  ```

 ## 4 main.js文件中的引用

- 上文已经将配置信息对象导出，那么就在这里引用

  ```js
  // 引用
  const {APP_PORT} = require("./config/config.default.js");
  
  // 在监听端口时，可以使用 配置的端口信息，来监听不同的端口
  app.listen(APP_PORT,()=>{
      console.log(`running on http://localhost:${APP_PORT}`)
  })
  ```

  

# 路由

路由：根据不同的URL，调用对应的处理函数

## 1 安装路由中间件

通过命令`npm i koa-router`

步骤：

- 导入
- 实例化对象
- 编写路由
- 注册中间件

```js
// 导入路由
const Router = require('koa-router');
// 实例化路由对象
const indexRouter = new Router();
const userRouter = new Router();
// 编写路由
indexRouter.get('/', (ctx, next) => {
  ctx.body = 'This is router from index';
});
userRouter.get('/users', (ctx, next) => {
  ctx.body = 'This is router from users';
});
// 注册中间件，中间件必须是一个函数，所以调用的是koa-router的routes()函数
app.use(indexRouter.routes());
app.use(userRouter.routes());
```

## 2 重构路由

如果将所有的路由处理都写在main文件中，且每次都要

- 实例化
- 编写路由
- 注册

会让main显得特别的拖沓

所以将route模块独立出来，解耦

- 在src目录下创建一个文件夹router用于处理所有的路由
- 将所有的路由细分，如：处理/users/的路由，定义为：user.route.js

```js
// 将main中的路由部分转移到这里
// 导入路由中间件
const Router = require('koa-router');
// 实例化
// prefix参数是默认拼接参数，即：prefix+处理函数中的路径，才是最终的路由
const userRouter = new Router({ prefix: '/users' });

// 处理Get，最终实际获得：prefix+路径 = /users/
// 第一个参数是路径，第二个参数是回调处理函数
userRouter.get('/', (ctx, next) => {
  ctx.body = 'hello users';
});

// 导出userRouter
module.exports = userRouter;

-----------------------------------------------------------------
// main中的调用
// 导入路由文件
const userRouter = require('./router/user.route');

// 注册路由中间件
app.use(userRouter.routes())
```

