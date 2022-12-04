import {Context} from "koa"

/**
 *
 * @param ctx
 * @param data 返回的数据
 * @param msg  提示信息
 * @param code  状态码
 */
function success(ctx: Context, data: any = {}, msg: string = 'success', code: number = 0) {
  ctx.body = {
    code,
    stat: 'ok',
    msg,
    data
  }
}

function fail(ctx: Context, msg: string = 'failed', data = {}, code: number = 1) {
  ctx.body = {
    code,
    stat: 'failed',
    msg,
    data
  }
}

export {
  success,
  fail
}
