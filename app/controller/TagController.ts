import { Context } from "koa";
import { fail, success, pageInfoSuccess } from "../../utils/response";
import TagService from "../service/TagService";
import validator from "../../utils/validate";
import {
  IAddTypeTagParams,
  IAddTypeTagRules,
  ITypeTagParams,
  ISetTypeTagRules,
  IPageInfoParams,
  IPageInfoRules
} from "../constant/rules";

class TagController {
  async getForFront(ctx: Context) {
    const tags = await TagService.getForFront();
    success(ctx, tags);
  }

  async getForBackend(ctx: Context) {
    const { data, error } = await validator<IPageInfoParams>(
      ctx,
      IPageInfoRules
    );
    if (error !== null) return fail(ctx, error);
    const { current, pageSize } = data;

    const tags = await TagService.getForBackend(Number(current), Number(pageSize));
    const total = await TagService.countRecords()
    pageInfoSuccess(ctx, tags, {...data, total});
  }

  async add(ctx: Context) {
    // 参数校验
    const { data, error } = await validator<IAddTypeTagParams>(
      ctx,
      IAddTypeTagRules
    );
    if (error !== null) return fail(ctx, error);

    const { name, label, color, is_show } = data;
    await TagService.addTag(name, label, color, is_show);
    success(ctx);
  }

  async set(ctx: Context) {
    // 参数校验
    const { data, error } = await validator<ITypeTagParams>(
      ctx,
      ISetTypeTagRules
    );
    if (error !== null) return fail(ctx, error);

    const { id, name, label, color, is_show } = data;
    const [affectRows] = await TagService.setTag(
      id,
      name,
      label,
      color,
      is_show
    );
    if (!affectRows) return fail(ctx);
    success(ctx);
  }
}

export default new TagController();
