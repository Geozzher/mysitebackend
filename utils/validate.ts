import Schema, {Rules, Values} from "async-validator";
import {Context} from "koa";

/**
 * 参数检验器，校验content-type=application/json的post请求，参数从request.body里取
 * @param ctx 上下文
 * @param rules 校验规则
 * @param flag 是否返回完整校验错误信息
 * @returns
 */
async function validate<T extends Values>(ctx: Context, rules: Rules, flag: boolean = true): Promise<{ data: T, error: any | null }> {
  const validator = new Schema(rules)
  let data: any = {}

  switch (ctx.method) {
    case "GET":
      break;
    case "POST":
      data = getFormatData(ctx)
      break
    case "DELETE":
      break
  }

  return await validator.validate(data).then(() => {
    return {
      data: data as T,
      error: null
    }
  }).catch(err => {
    if (flag) {
      return {
        error: err.errors[0].message,
        data: {} as T
      }
    } else {
      return {
        error: err,
        data: {} as T
      }
    }
  })
}


function getFormatData(ctx: Context) {
  return ctx.request.body
}

export default validate
