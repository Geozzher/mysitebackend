import {Context} from 'koa'
import {fail, success} from '../../utils/response'
import TagService from "../service/TagService";
import validator from "../../utils/validate";
import {IAddTypeTagParams, IAddTypeTagRules, ITypeTagParams, ISetTypeTagRules} from "../constant/rules";

class TagController {
  async get(ctx: Context) {
    const menus = await TagService.get()
    success(ctx, menus)
  }

  async add(ctx: Context) {
    // 参数校验
    const {data, error} = await validator<IAddTypeTagParams>(ctx, IAddTypeTagRules)
    if (error !== null) return fail(ctx, error)

    const {name, label, color, is_show} = data
    await TagService.addTag(name, label, color, is_show)
    success(ctx)
  }

  async set(ctx: Context) {
    // 参数校验
    const {data, error} = await validator<ITypeTagParams>(ctx, ISetTypeTagRules)
    if (error !== null) return fail(ctx, error)

    const {id, name, label, color, is_show} = data
    await TagService.setTag(id, name, label, color, is_show)
    success(ctx)
  }
}

export default new TagController()
