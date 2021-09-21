// 导入index中实例化的Koa
const app = require('./app/index');
// 导入config文件
const { APP_PORT } = require('./config/config.default');

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
  //   console.log(`server is running on http://localhost:/3000`);
});
