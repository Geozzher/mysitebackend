import {Context} from "koa";
import {fail, pageInfoSuccess, success} from "../../utils/response";
import TypeService from "../service/TypeService";
import validator from "../../utils/validate";
import {
  IAddTypeTagParams, IAddTypeTagRules, ITypeTagParams, ISetTypeTagRules, IPageInfoParams, IPageInfoRules,
} from "../constant/rules";
import TagService from "../service/TagService";

class TypeController {
  /**
   * 前台获取数据
   * @param ctx
   */
  async getForFront(ctx: Context) {
    const tags = await TypeService.getForFront();
    success(ctx, tags);
  }

  /**
   * 管理后台分页获取数据
   * @param ctx
   */
  async getForBackend(ctx: Context) {
    const {data, error} = await validator<IPageInfoParams>(ctx, IPageInfoRules);
    if (error !== null) {
      const data = await TypeService.getForBackend();
      return success(ctx, data);
    };
    const {current, pageSize} = data;

    const tags = await TypeService.getForBackend(Number(current), Number(pageSize));
    const total = await TypeService.countRecords()
    pageInfoSuccess(ctx, tags, {...data, total});
  }

  async add(ctx: Context) {
    // 参数校验
    const {data, error} = await validator<IAddTypeTagParams>(ctx, IAddTypeTagRules);
    if (error !== null) return fail(ctx, error);

    const {name, label, color, is_show} = data;
    await TypeService.addType(name, label, color, is_show);
    success(ctx);
  }

  async set(ctx: Context) {
    // 参数校验
    const {data, error} = await validator<ITypeTagParams>(ctx, ISetTypeTagRules);
    if (error !== null) return fail(ctx, error);

    const {id, name, label, color, is_show} = data;
    const [affectRows] = await TypeService.setType(id, name, label, color, is_show);
    if (!affectRows) return fail(ctx);
    success(ctx);
  }
}

export default new TypeController();
