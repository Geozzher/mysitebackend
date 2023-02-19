import Article from '../model/Article';
import {getDateTime} from '../../utils/dateTime';
import {WhereOptions} from 'sequelize';
import {IAddArticleParams, ISetArticleParams} from '../constant/rules';
import sequelize from 'sequelize';

class ArticleService {
  /**
   * 前台获取文章列表, 分页
   */
  getListForFront(current: number, pageSize: number, params?: WhereOptions) {
    return Article.findAll({
      // attributes: ['id', 'title', 'introduce', 'types', 'tags', 'cover', 'visited_counts', 'liked_counts', 'is_show'],
      attributes: {
        include: [
          [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('created_at'), '%Y年%m月%d日 %H:%i:%s'), 'created_at'],
          [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('article_updated_at'), '%Y年%m月%d日 %H:%i:%s'), 'article_updated_at'],
        ],
        exclude: ['updated_at', 'content_html', 'content_raw', 'is_show']
      },
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
      attributes: {
        include: [
          [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('created_at'), '%Y年%m月%d日 %H:%i:%s'), 'created_at'],
          [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('article_updated_at'), '%Y年%m月%d日 %H:%i:%s'), 'article_updated_at'],
        ],
        exclude: ['updated_at']
      },
      // attributes: ['id', 'title', 'introduce', 'types', 'tags', 'cover', 'visited_counts', 'liked_counts', 'is_show'],
      offset: (current - 1) * pageSize,
      limit: pageSize,
      where: params || {},
    });
  }

  /**
   * 获取文章详情
   */
  getDetail(id: string, whereOptions: {} = {}) {
    return Article.findOne({
      attributes: {
        include: [
          [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('created_at'), '%Y年%m月%d日 %H:%i:%s'), 'created_at'],
          [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('article_updated_at'), '%Y年%m月%d日 %H:%i:%s'), 'article_updated_at'],
        ],
        exclude: ['updated_at']
      },
      // attributes: ['id', 'title', 'introduce', 'types', 'tags', 'cover', 'visited_counts', 'liked_counts', 'is_show', 'content_raw', 'content_html'],
      where: {id: id, ...whereOptions}
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
    return Article.create({
      ...article,
    });
  }

  /**
   * 修改文章
   */
  setArticle(article: ISetArticleParams) {
    const current = getDateTime();
    return Article.update(
      {...article, article_updated_at: current},
      {where: {id: article.id}}
    );
  }

  /**
   * 文章访问量
   * @param id
   */
  updateViews({id}: { id: string }) {
    return Article.update({
        visited_counts: sequelize.literal('visited_counts+1')
      }, {where: {id}}
    )
  }
}

export default new ArticleService();
