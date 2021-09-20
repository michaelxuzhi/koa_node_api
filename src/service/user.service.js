// 用于操作数据库的层级，从路由层单独抽离出来，解耦

// 导入sequelize
const Sequelize = require('sequelize');
const sequelize = new Sequelize();

class UserService {
  async createUser(user_name, password) {
    // todo:写入数据库
    return '写入数据库,成功';
  }
}

// 导出数据库操作，主要是路由层使用，所以要在路由controller中导入
module.exports = new UserService();
