import {Context} from "koa";

export function getPostParams(ctx: Context) {
  return {...ctx.request.body}
}

export function getQueryParams(ctx: Context) {
  return {...ctx.request.query}
}
