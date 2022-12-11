import { Context } from "koa";
import validator from "../../utils/validate";
import { fail, success } from "../../utils/response";
import { AES, AESparse } from "../../utils/hash";
import UserService from "../service/UserService";
import * as Tips from "../constant/handleError";
import {
  IDeleteAdmin,
  IDeleteAdminRules,
  ILogin,
  ILoginRules,
  IRegister,
  IRegisterRules,
  IUpdateAdmin,
  IUpdateAdminRules,
} from "../constant/rules";
import User from "../model/User";
import {
  deleteToken,
  setToken,
  tokenSign,
  tokenValidate,
  tokenVerify,
} from "../../utils/token";
import { tokenToString } from "typescript";

class UserController {
  async register(ctx: Context) {
    const { data, error } = await validator<IRegister>(ctx, IRegisterRules);
    if (error !== null) return fail(ctx, error);

    const user: User | null = await UserService.getUserByName(data.username);
    if (user !== null) return fail(ctx, Tips.REGISTER_IS_EXISTS);

    const HASH_STRING = AES(data.password);
    const id = new Date().getTime();

    await UserService.createUser(
      id,
      data.username,
      HASH_STRING as string,
      data.description,
      data.email,
      data.permission
    );
    return success(ctx, {}, Tips.REGISTER_OK, 0);
  }

  async loginOut(ctx: Context) {
    const { username } = ctx.request.body;
    deleteToken(username);
    return success(ctx, Tips.LOGIN_OUT);
  }

  async login(ctx: Context) {
    const { data, error } = await validator<ILogin>(ctx, ILoginRules);
    if (error !== null) {
      return fail(ctx, error);
    }
    const user = await UserService.getUserByName(data.username);
    // 是否存在用户
    if (user == null) {
      return fail(ctx, Tips.USERNAME_IS_NULL);
    }
    // 用户密码是否正确
    if (AESparse(user.password) !== data.password) {
      return fail(ctx, Tips.LOGIN_FAILED);
    }
    // redis中写入token
    setToken(ctx, tokenSign({ username: data.username }), data.username);
    // 此处可埋点统计登录人数
    return success(ctx, {}, Tips.LOGIN_OK);
  }

  async update(ctx: Context) {
    const { data, error } = await validator<IUpdateAdmin>(
      ctx,
      IUpdateAdminRules
    );
    if (error !== null) {
      return fail(ctx, error);
    }
    const HASH = AES(data.password);
    await UserService.updateUser(
      data.id as unknown as number,
      data.username,
      HASH as string,
      data.description,
      data.email,
      data.permission
    );

    return success(ctx, {}, Tips.OPERATOR_OK, 0);
  }

  async delete(ctx: Context) {
    const { data, error } = await validator<IDeleteAdmin>(
      ctx,
      IDeleteAdminRules
    );
    if (error !== null) {
      return fail(ctx, error);
    }

    const count: number = (await UserService.deleteUserById(
      data.id as unknown as number
    )) as unknown as number;
    count && success(ctx, {}, Tips.OPERATOR_OK);
    !count && success(ctx, {}, Tips.SEARCHDATA_IS_NULL);
  }

  async findAdminById(ctx: Context) {
    const { data, error } = await validator<IDeleteAdmin>(
      ctx,
      IDeleteAdminRules
    );
    if (error !== null) {
      return fail(ctx, error);
    }

    const user: User | null = await UserService.getUserById(
      data.id as unknown as number
    );
    if (user == null) {
      return fail(ctx, Tips.SEARCHDATA_IS_NULL);
    }
    return success(ctx, user, Tips.SEARCH_OK);
  }

  // 在Redis中验证token和username是否一致
  async verify(ctx: Context) {
    const { token, username } = ctx.request.header;
    const { routeCode } = ctx.request.body;
    if (!token || !username) return fail(ctx, "缺少有效的校验信息");

    // 验证token
    // @ts-ignore
    const { user, error } = await tokenValidate(
      token.toString(),
      username.toString()
    );
    if (user == null) {
      return fail(ctx, error?.message);
    }

    // 验证permission
    const permissions = await UserService.getUserPermissions(
      username.toString()
    );
    if (!permissions.includes(routeCode)) {
      return fail(ctx, Tips.TOKEN_IS_UNDEFINED);
    }

    return success(ctx);
  }
}

export default new UserController();
