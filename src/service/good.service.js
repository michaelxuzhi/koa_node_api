// 导入商品数据模型
const Goods = require('../model/goods.model');

class GoodsService {
  async createGoods(goods) {
    // console.log('测试商品发布成功');
    // 假的返回数据
    // return {
    //   goods_name: '测试商品_名称',
    // };
    // 正式创建商品数据，异步
    const res = await Goods.create(goods);
    return res.dataValues;
  }
}

module.exports = new GoodsService();
