import jwt, {JsonWebTokenError, JwtPayload, TokenExpiredError} from "jsonwebtoken";
import {Context} from "koa";
import redisClient from '../app/redis'
import config from "../app/config";
import {fstat} from "fs";

const TOKEN = 'token'
const USERNAME = 'username'

export function tokenSign(data: any) {
  return jwt.sign(data, config.jwt.jwt_secret as string, {expiresIn: config.jwt.jwt_expire})
}


export function tokenVerify(token: string): { user: JwtPayload | string | null, error: TokenExpiredError | JsonWebTokenError | null } {
  try {
    const decoded = jwt.verify(token, config.jwt.jwt_secret as string)
    return {
      user: decoded,
      error: null
    }
  } catch (error) {
    return {
      user: null,
      error: error as TokenExpiredError | JsonWebTokenError | null
    }
  }
}

//跟redis中存储的token比较是否合法
export function tokenValidate(token: string, username: string) {
  // 目标token与redis存储token是否一致
  return new Promise(((resolve, reject) => {
    redisClient.get(`${username}:${TOKEN}`, (err: any, redisToken: string | null) => {
      if (redisToken == null || redisToken !== token) {
        resolve({user: null, error: {message: "非法的token"}})

      } else {
        resolve(tokenVerify(token))
      }
    })
  }))
  // redisClient.get

}

//token令牌的设置操作
export function setToken(ctx: Context, tokenValue: string, username: string) {
  ctx.set(TOKEN, tokenValue)
  ctx.set(USERNAME, username)
  ctx.set("Access-Control-Expose-Headers", `${TOKEN},${USERNAME}`)
  redisClient.SETEX(`${username}:${TOKEN}`, 60 * 60 * 8, tokenValue)
}

// 删除redis中的token,强制客户端的token失效
export function deleteToken(username: string) {
  redisClient.DEL(`${username}:${TOKEN}`)
}
