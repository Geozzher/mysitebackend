import {Context} from "koa";
import {fail, success} from "../../utils/response";
import StatisticService from "../service/StatisticService";
import {getQueryParams} from "../../utils/getRequestParams";

class StatisticController {
  /**
   * 更新
   * @param ctx
   */
  async updateViewCounts(ctx: Context) {
    const {key = 'main_page'} = getQueryParams(ctx);
    // @ts-ignore
    const [affectRows] = await StatisticService.updateViewCounts(key);
    success(ctx, affectRows);
  }
}

export default new StatisticController();
