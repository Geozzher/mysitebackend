import {Context} from "koa";
import {fail, pageInfoSuccess, success} from "../../utils/response";
import NavMenuService from "../service/NavMenuService";
import validator from "../../utils/validate";
import {
  IAddNavMenuParams,
  IAddNavMenuRules,
  INavMenuParams,
  ISetNavMenuRules,
  IPageInfoParams,
  IPageInfoRules,
} from "../constant/rules";

class NavMenuController {
  /**
   * 前台获取数据
   * @param ctx
   */
  async getForFront(ctx: Context) {
    const menus = await NavMenuService.getForFront();
    success(ctx, menus);
  }

  /**
   * 管理后台分页获取数据
   * @param ctx
   */
  async getForBackend(ctx: Context) {
    const {data, error} = await validator<IPageInfoParams>(ctx, IPageInfoRules);
    if (error !== null) return fail(ctx, error);
    const {current, pageSize} = data;

    const tags = await NavMenuService.getForBackend(Number(current), Number(pageSize));
    const total = await NavMenuService.countRecords()
    pageInfoSuccess(ctx, tags, {...data, total});
  }

  async add(ctx: Context) {
    // 参数校验
    const {data, error} = await validator<IAddNavMenuParams>(ctx, IAddNavMenuRules);
    if (error !== null) return fail(ctx, error);

    const {name, label, path, is_show} = data;
    await NavMenuService.addNavMenu(name, label, path, is_show);
    success(ctx);
  }

  async set(ctx: Context) {
    // 参数校验
    const {data, error} = await validator<INavMenuParams>(ctx, ISetNavMenuRules);
    if (error !== null) return fail(ctx, error);

    const {id, name, label, path, is_show} = data;
    const [affectRows] = await NavMenuService.setNavMenu(id, name, label, path, is_show);
    if (!affectRows) return fail(ctx);
    success(ctx);
  }
}

export default new NavMenuController();
