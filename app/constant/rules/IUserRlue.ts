import {Rules} from "async-validator";
import number from "async-validator/dist-types/validator/number";
import {MakeRule} from "./MakeRlue";

/**
 * user参数校验
 */
export interface IRegister {
  username: string;
  password: string;
  description: string;
  email: string;
  permission: string;
}

const IUserRoles = {
  id: [new MakeRule("id").required().get()],
  username: [new MakeRule("username").required().get()],
  password: [new MakeRule("password").required().get()],
  description: [new MakeRule("description").required().get()],
  email: [new MakeRule("email").required().get()],
  permission: [new MakeRule("permission").required().get()],
};

export const IRegisterRules: Rules = {
  username: IUserRoles.username,
  password: IUserRoles.password,
  description: IUserRoles.description,
  email: IUserRoles.email,
  permission: IUserRoles.permission,
};

export interface ILogin {
  username: string;
  password: string;
}

export const ILoginRules: Rules = {
  username: IUserRoles.username,
  password: IUserRoles.password,
};

export interface IUpdateAdmin {
  id: number;
  username: string;
  password: string;
  description: string;
  email: string;
  permission: string;
}

export const IUpdateAdminRules: Rules = {
  ...IUserRoles,
};

export interface IDeleteAdmin {
  id: "number";
}

export const IDeleteAdminRules: Rules = {
  id: IUserRoles.id,
};
