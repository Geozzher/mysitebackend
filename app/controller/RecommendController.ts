import {Context} from "koa";
import {success} from "../../utils/response";
import RecommendService from "../service/RecommendService";

class RecommendController {
  /**
   * 前台获取数据
   * @param ctx
   */
  async getForFront(ctx: Context) {
    const recommends = await RecommendService.getForFront();
    success(ctx, recommends);
  }
}

export default new RecommendController();
