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
        id, // 商品id，可写作：id:id
      },
    });
    // 更新商品数据的结果返回res是一个数组，数组的第一个元素是更新的数据条数，第二个元素是更新的数据，如果更新的数据条数为0，则表示更新失败
    return res[0] > 0 ? true : false;
  }

  // 删除商品信息接口
  async removeGoods(id) {
    // console.log('测试商品删除成功');
    // 正式删除商品数据，异步
    const res = await Goods.destroy({
      where: {
        id, // 商品id，可写作：id:id
      },
    });
    // 删除商品数据的结果返回res是一个number类型，删除的对应id的记录的数量，如果删除的数量为0，则表示删除失败
    // console.log(res);
    return res > 0 ? true : false;
  }

  // 下架商品信息接口
  async softRemoveGoods(id) {
    // console.log('测试商品下架成功');
    // 正式下架商品数据，异步
    const res = await Goods.destroy({
      where: {
        id, // 商品id，可写作：id:id
      },
    });
    // 下架商品和硬删除调用的接口一致：destroy
    // 区别：如果该数据表配置了paranoid:true，那么destroy方法会自动添加删除时间，并且会自动添加软删除标识；而如果没有配置paranoid:true，那么destroy方法将从数据库中直接删除该条记录
    // 下架商品数据的结果返回res是一个数组，数组的第一个元素是更新的数据条数，第二个元素是更新的数据，如果更新的数据条数为0，则表示更新失败
    return res > 0 ? true : false;
  }
}

module.exports = new GoodsService();
