import {Context} from "koa"

/**
 *
 * @param ctx
 * @param data 返回的数据
 * @param msg  提示信息
 * @param code  状态码
 */
export const success = (ctx: Context, data: any = {}, msg: string = 'success', code: number = 0) => {
  ctx.body = {
    code,
    stat: 'ok',
    msg,
    data
  }
}

export const pageInfoSuccess = (ctx: Context, data: any = {}, pageInfo: any = {}, msg: string = 'success', code: number = 0) => {
  ctx.body = {
    code,
    stat: 'ok',
    msg,
    data: {
      list: data,
      pageInfo
    }
  }
}

export const fail = (ctx: Context, msg: string = 'failed', data = {}, code: number = 1) => {
  ctx.body = {
    code,
    stat: 'failed',
    msg,
    data
  }
}
