const Koa = require('koa');

const app = new Koa();

// 导入config文件
const { APP_PORT } = require('./config/config.default');

// 导入路由
const userRouter = require('./router/user.route');

// app.use((ctx, next) => {
//   ctx.body = 'Hello Koa from main.js';
// });

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
  //   console.log(`server is running on http://localhost:/3000`);
});

// 测试gitpush
// 测试git push to github
