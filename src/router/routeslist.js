// 自动读取router文件夹下的路由文件，并完成导入，交由app/index注册

// 导入node文件系统工具
const fs = require('fs');

// 导入koa-router，并实例化
const Router = require('koa-router');
const router = new Router();

// 读取当前目录文件-同步的方式
fs.readdirSync(__dirname).forEach(fileName => {
  //   console.log(fileName);
  // 排除掉roulist文件
  if (fileName !== 'routeslist.js') {
    // 加载各个路由文件
    let r = require('./' + fileName);
    // 使用koa-router完成初始化
    // 这里只是完成初始化，还需要将这些初始化文件挂在到app下
    router.use(r.routes());
  }
});

module.exports = router;
