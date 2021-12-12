// 商品对象模型的文件
// 当从service层实现对数据库的操作时，这里就是实际数据库实例化出来的模型对象，对应的是：商品数据表

// 导入数据类型
const { DataTypes } = require('sequelize');

// 导入sequelize实例化对象，即：seq文件下创建的对象
// 数据库连接导入
const seq = require('../db/seq');

// 创建商品模型，建立数据表
const Goods = seq.define('shop_goods', {
  goods_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '商品名',
  },
  goods_price: {
    // 价格：使用的是十进制的双精度类型(保留两位小数)
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '商品价格',
  },
  goods_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品库存',
  },
  goods_img: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品图片的url',
  },
});

// 强制创建Goods表
// Goods.sync({ force: true });

module.exports = Goods;
