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

  // 修改商品信息接口
  async updateGoods(id, goods) {
    // console.log('测试商品修改成功');
    // 正式修改商品数据，异步
    const res = await Goods.update(goods, {
      where: {
        id: id,
      },
    });
    // 更新商品数据的结果返回res是一个数组，数组的第一个元素是更新的数据条数，第二个元素是更新的数据，如果更新的数据条数为0，则表示更新失败
    return res[0] > 0 ? true : false;
  }
}

module.exports = new GoodsService();
