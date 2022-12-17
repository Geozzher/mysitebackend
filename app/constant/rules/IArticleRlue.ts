import {Rules} from "async-validator";
import {MakeRule} from "./MakeRlue";

/**
 * Article参数校验
 */
const IArticleRules = {
  id: [new MakeRule("id").required().range(20).get()],
  title: [new MakeRule("title").required().range(50).get()],
  introduce: [new MakeRule("introduce").required().range(100).get()],
  types: [new MakeRule("types").required().range(60).get()],
  tags: [new MakeRule("tags").required().range(60).get()],
  cover: [new MakeRule("cover").required().range(255).get()],
  content: [new MakeRule("content").required().get()],
  content_html: [new MakeRule("content_html").required().get()],
  visited_counts: [new MakeRule("visited_counts", 'number').required().get()],
  liked_counts: [new MakeRule("liked_counts", 'number').required().get()],
  is_show: [new MakeRule("is_show", "boolean").required().len(1).get()],
};

export interface IArticleParams {
  id: string;
  title: string;
  introduce: string;
  types: string;
  tags: string;
  cover: string;
  content: string;
  content_html: string;
  visited_counts: number;
  liked_counts: number;
  is_show: boolean;
}

export interface IGetArticleDetailParams {
  id: string;
}

export const IGetArticleDetailRules: Rules = {
  id: IArticleRules.id,
};

export interface IAddArticleParams {
  title: string;
  introduce: string;
  types: string;
  tags: string;
  cover: string;
  content: string;
  content_html: string;
  is_show: boolean;
}

export const IAddArticleRules: Rules = {
  title: IArticleRules.title,
  introduce: IArticleRules.introduce,
  types: IArticleRules.types,
  tags: IArticleRules.tags,
  cover: IArticleRules.cover,
  content: IArticleRules.content,
  content_html: IArticleRules.content_html,
  is_show: IArticleRules.is_show,
};

export interface ISetArticleParams {
  id: string;
  title: string;
  introduce: string;
  types: string;
  tags: string;
  cover: string;
  content: string;
  content_html: string;
  is_show: boolean;
}

export const ISetArticleRules: Rules = {
  id: IArticleRules.id,
  title: IArticleRules.title,
  introduce: IArticleRules.introduce,
  types: IArticleRules.types,
  tags: IArticleRules.tags,
  cover: IArticleRules.cover,
  content: IArticleRules.content,
  content_html: IArticleRules.content_html,
  is_show: IArticleRules.is_show,
};
