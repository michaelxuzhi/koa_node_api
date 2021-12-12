// 用户对象模型的文件
// 模型对象的创建是基于sequelize实例化出来的对象，一个实例化对象=一个数据库表
// 导入sequelize和其中创建模型的方法
const { DataTypes } = require('sequelize');

// 导入sequelize实例化对象，即：seq文件下创建的对象
const seq = require('../db/seq');

// class User extends Model {}
// User.init(
//   // 对应的数据表的列名
//   {
//     user_name: {
//       type: DataTypes.STRING,
//     },
//     password: {
//       type: DataTypes.STRING,
//     },
//     is_admin: {
//       type: DataTypes.INTEGER,
//     },
//   },
//   // 其他参数：必填：连接的实例
//   { seq }
// );

const User = seq.define('User', {
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名，唯一',
  },
  password: {
    type: DataTypes.CHAR,
    allowNull: false,
    comment: '密码',
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否为管理员，0：不是(默认)；1：是',
  },
});

// 同步数据表，{ force: true }，数据表存在，则删除，重新创建
// User.sync({ force: true });
// User.sync();

// 导出模型-User
module.exports = User;
