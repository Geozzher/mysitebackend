import {Rules} from 'async-validator'
import {
  InternalRuleItem,
  Rule,
  RuleType,
  SyncValidateResult,
  ValidateOption,
  Value,
  Values
} from "async-validator/dist-types/interface";

const requiredRules = (name: string, length?: number, type = 'string') => {
  const rule = {type, required: true, message: `parameters ${name}<${type}> is not allowed`} as any
  if (length) rule.len = length
  return rule
}

class MakeRule {
  private rule: any;
  constructor(name: string, type: string = 'string') {
    this.rule = {type, message: `parameters ${name}<${type}> is not allowed`}
    return this
  }

  get() {
    return this.rule
  }

  required() {
    this.rule.required = true
    return this
  }

  len(length: number) {
    this.rule.len = length
    return this
  }

  range(min: number, max: number) {
    this.rule.min = min
    this.rule.max = max
    return this
  }

  enum(params: Array<string | number | boolean | null | undefined>) {
    this.rule.enum = params
    return this
  }

  pattern(pattern: RegExp | string) {
    this.rule.pattern = pattern
    return this
  }
}

/**
 * user参数校验
 */
export interface IRegister {
  username: string,
  password: string,
  description: string,
  email: string,
  permission: string
}

const IUserRoles = {
  id: [new MakeRule('id').required().get()],
  username: [new MakeRule('username').required().get()],
  password:[new MakeRule('password').required().get()],
  description: [new MakeRule('description').required().get()],
  email: [new MakeRule('email').required().get()],
  permission: [new MakeRule('permission').required().get()],
}

export const IRegisterRules: Rules = {
  username: IUserRoles.username,
  password: IUserRoles.password,
  description: IUserRoles.description,
  email: IUserRoles.email,
  permission: IUserRoles.permission,
}

export interface ILogin {
  username: string,
  password: string,
}

export const ILoginRules: Rules = {
  username: IUserRoles.username,
  password: IUserRoles.password,
}

export interface IUpdateAdmin {
  id: number,
  username: string,
  password: string,
  description: string,
  email: string,
  permission: string
}

export const IUpdateAdminRules: Rules = {
  ...IUserRoles
}

export interface IDeleteAdmin {
  id: 'number'
}

export const IDeleteAdminRules: Rules = {
  id: IUserRoles.id,
}

/**
 * navMenu参数校验
 */

const INavMenuRules = {
  id: [new MakeRule('id').required().get()],
  name: [new MakeRule('name').required().get()],
  label: [new MakeRule('label').required().get()],
  path: [new MakeRule('path').required().get()],
  is_show: [new MakeRule('is_show').required().len(1).get()],
}

export interface IAddNavMenuParams {
  name: string
  label: string
  path: string
  is_show: string
}

// @ts-ignore
export const IAddNavMenuRules: Rules = {
  name: INavMenuRules.name,
  label: INavMenuRules.label,
  path: INavMenuRules.path,
  is_show: INavMenuRules.is_show,
}

export interface INavMenuParams {
  id: string
  name: string
  label: string
  path: string
  is_show: string
}

// @ts-ignore
export const ISetNavMenuRules: Rules = {
  ...INavMenuRules
}

/**
 * tag type参数校验
 */
const ITypeTagRules = {
  id: [new MakeRule('id').required().get()],
  name: [new MakeRule('name').required().get()],
  label: [new MakeRule('label').required().get()],
  color: [new MakeRule('color').required().get()],
  is_show: [new MakeRule('is_show').required().len(1).get()],
}

export interface IAddTypeTagParams {
  name: string
  label: string
  color: string
  is_show: string
}

// @ts-ignore
export const IAddTypeTagRules: Rules = {
  name: ITypeTagRules.name,
  label: ITypeTagRules.label,
  color: ITypeTagRules.color,
  is_show: ITypeTagRules.is_show,
}

export interface ITypeTagParams {
  id: string
  name: string
  label: string
  color: string
  is_show: string
}

// @ts-ignore
export const ISetTypeTagRules: Rules = {
 ...ITypeTagRules
}
