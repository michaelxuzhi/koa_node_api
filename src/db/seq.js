// 对数据库的实际操作，使用sequelize插件+mysql2

// 导入配置信息
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
} = require('../config/config.default');

// 导入sequelize
const Sequelize = require('sequelize');
// 数据库连接参数配置，参数：db数据库名，username用户名，password密码，{host主机名，dialect数据库类型}
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql',
});

// 连接数据库
// seq
//   .authenticate()
//   .then(() => {
//     console.log('数库连接成功！');
//   })
//   .catch(err => {
//     console.log('数据库连接失败', err);
//   });

module.exports = seq;
