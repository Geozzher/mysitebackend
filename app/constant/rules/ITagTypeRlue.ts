import {Rules} from "async-validator";
import {MakeRule} from "./MakeRlue";

/**
 * tag type参数校验
 */
const ITypeTagRules = {
  id: [new MakeRule("id").required().range(20).get()],
  name: [new MakeRule("name").required().range(20).get()],
  label: [new MakeRule("label").required().range(8).get()],
  color: [new MakeRule("color").required().range(10).get()],
  is_show: [new MakeRule("is_show", "boolean").required().len(1).get()],
};

export interface IAddTypeTagParams {
  name: string;
  label: string;
  color: string;
  is_show: boolean;
}

export const IAddTypeTagRules: Rules = {
  name: ITypeTagRules.name,
  label: ITypeTagRules.label,
  color: ITypeTagRules.color,
  is_show: ITypeTagRules.is_show,
};

export interface ITypeTagParams {
  id: string;
  name: string;
  label: string;
  color: string;
  is_show: boolean;
}

export const ISetTypeTagRules: Rules = {
  ...ITypeTagRules,
};
