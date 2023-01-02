import Recommend from "../model/Recommend";

class RecommendService {
  /**
   * 获取推荐功能
   */
  getForFront() {
    return Recommend.findAll({
      attributes: {
        exclude: ['created_at', 'updated_at', 'is_show']
      },
      where: {is_show: true}
    });
  }
}

export default new RecommendService();
