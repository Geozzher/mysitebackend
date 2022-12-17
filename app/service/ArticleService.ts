import Article from "../model/Article";
import {getTimeStamps} from "../../utils/dateTime";
import {WhereOptions} from "sequelize";
import {IAddArticleParams, ISetArticleParams} from "../constant/rules";

class ArticleService {
  /**
   * 前台获取文章列表, 分页
   */
  getListForFront(current: number, pageSize: number, params?: WhereOptions) {
    return Article.findAll({
      attributes: ['id', 'title', 'introduce', 'types', 'tags', 'cover', 'visited_counts', 'liked_counts', 'is_show'],
      offset: (current - 1) * pageSize,
      limit: pageSize,
      where: {
        is_show: true,
        ...(params || {})
      },
    });
  }

  /**
   * 获取文章列表, 分页
   */
  getListForBackend(current: number, pageSize: number, params?: WhereOptions) {
    return Article.findAll({
      attributes: ['id', 'title', 'introduce', 'types', 'tags', 'cover', 'visited_counts', 'liked_counts', 'is_show'],
      offset: (current - 1) * pageSize,
      limit: pageSize,
      where: params || {},
    });
  }

  /**
   * 获取文章详情
   */
  getDetail(id: string) {
    return Article.findOne({
      attributes: ['id', 'title', 'introduce', 'types', 'tags', 'cover', 'visited_counts', 'liked_counts', 'is_show', 'content', 'content_html'],
      where: {id: id}
    });
  }

  countRecords(params?: WhereOptions) {
    return Article.count({
      where: params || {},
    });
  }

  /**
   * 增加一篇文章
   */
  addArticle(article: IAddArticleParams) {
    const id = getTimeStamps();
    return Article.create({
      id,
      ...article,
      visited_counts: 0,
      like_counts: 0,
    });
  }

  /**
   * 修改头部导航链接
   */
  setArticle(article: ISetArticleParams) {
    return Article.update(
      {...article},
      {where: {id: article.id}}
    );
  }
}

export default new ArticleService();
