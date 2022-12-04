import {Context, Next} from "koa";
import {tokenVerify} from "../../utils/token";

/**
 * 对于需要登录态访问的接口，要进行白名单校验
 * @param ctx
 * @param next
 * @constructor
 */
function AuthMiddleware(ctx: Context, next: Next) {
  const token = ctx.header['authorization']

  if (token !== undefined && token !== "") {
    const {error} = tokenVerify(token)
    if (error !== null) {
      ctx.body = {
        //@ts-ignore
        msg: error.message,
        code: 40000
      }
      return
    } else {
      return next()
    }

  }

  ctx.body = {
    msg: '缺乏有效的auth',
    code: 40000
  }
  return

}


export default AuthMiddleware
