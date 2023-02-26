import {Context, Next} from "koa";
import {tokenValidate} from "../../../utils/token";
import {authFail} from "../../../utils/response";
import {whiteListRoutes} from "./constant";

/**
 * 对于需要登录态访问的接口，要进行白名单校验
 * @param ctx
 * @param next
 * @constructor
 */
async function Index(ctx: Context, next: Next) {
  if (whiteListRoutes.includes((ctx.originalUrl.split('?')[0]))){
    return next()
  }
  const SESSION_ID = ctx.cookies.get('SESSION_ID');
  const {token} = ctx.request.header;
  if (!SESSION_ID || !token) {
    return authFail(ctx)
  }
  // @ts-ignore
  const {user: {userId}} = await tokenValidate(token, SESSION_ID)
  if (!userId) {
    return authFail(ctx)
  }
  const requestBody = ctx.request.body;
  ctx.request.body = {...requestBody, userId}
  return next()
}

export default Index
