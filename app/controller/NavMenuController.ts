import {Context} from 'koa'
import {fail, success} from '../../utils/response'
import NavMenuService from "../service/NavMenuService";
import validator from "../../utils/validate";
import {IAddNavMenuParams, IAddNavMenuRules, INavMenuParams, ISetNavMenuRules} from "../constant/rules";

class NavMenuController {
  async get(ctx: Context) {
    const menus = await NavMenuService.get()
    success(ctx, menus)
  }

  async add(ctx: Context) {
    // 参数校验
    const {data, error} = await validator<IAddNavMenuParams>(ctx, IAddNavMenuRules)
    if (error !== null) return fail(ctx, error)

    const {name, label, path, is_show} = data
    await NavMenuService.addNavMenu(name, label, path, is_show)
    success(ctx)
  }

  async set(ctx: Context) {
    // 参数校验
    const {data, error} = await validator<INavMenuParams>(ctx, ISetNavMenuRules)
    if (error !== null) return fail(ctx, error)

    const {id, name, label, path, is_show} = data
    await NavMenuService.setNavMenu(id, name, label, path, is_show)
    success(ctx)
  }
}

export default new NavMenuController()
