const Koa = require('koa');

// 导入config文件
const { APP_PORT } = require('./config/config.default');

const app = new Koa();
app.use((ctx, next) => {
  ctx.body = 'Hello Koa from main.js';
});

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
  //   console.log(`server is running on http://localhost:/3000`);
});
