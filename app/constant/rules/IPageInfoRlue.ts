import {Rules} from "async-validator";
import {MakeRule} from "./MakeRlue";

export interface IPageInfoParams {
  current: string;
  pageSize: string;
}

const PageInfoRules = {
  current: [new MakeRule('current', 'string').required().get()],
  pageSize: [new MakeRule('pageSize', 'string').required().get()],
};
export const IPageInfoRules: Rules = {
  current: PageInfoRules.current,
  pageSize: PageInfoRules.pageSize
};
