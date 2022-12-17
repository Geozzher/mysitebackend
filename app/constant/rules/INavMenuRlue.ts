import {Rules} from "async-validator";
import {MakeRule} from "./MakeRlue";

/**
 * navMenu参数校验
 */
const INavMenuRules = {
  id: [new MakeRule("id").required().range(20).get()],
  name: [new MakeRule("name").required().range(20).get()],
  label: [new MakeRule("label").required().range(8).get()],
  path: [new MakeRule("path").required().get()],
  is_show: [new MakeRule("is_show", "boolean").required().len(1).get()],
};

export interface IAddNavMenuParams {
  name: string;
  label: string;
  path: string;
  is_show: boolean;
}

export const IAddNavMenuRules: Rules = {
  name: INavMenuRules.name,
  label: INavMenuRules.label,
  path: INavMenuRules.path,
  is_show: INavMenuRules.is_show,
};

export interface INavMenuParams {
  id: string;
  name: string;
  label: string;
  path: string;
  is_show: boolean;
}

export const ISetNavMenuRules: Rules = {
  ...INavMenuRules,
};
