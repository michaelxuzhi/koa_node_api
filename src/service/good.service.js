class GoodsService {
  async createGoods(goods) {
    console.log('测试商品发布成功');
    // 假的返回数据
    return {
      goods_name: '测试商品_名称',
    };
  }
}

module.exports = new GoodsService();
