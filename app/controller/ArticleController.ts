import {Context} from "koa";
import {fail, pageInfoSuccess, success} from "../../utils/response";
import ArticleService from "../service/ArticleService";
import validator from "../../utils/validate";
import {
  IAddArticleParams, IAddArticleRules,
  IGetArticleDetailParams, IGetArticleDetailRules,
  IPageInfoParams, IPageInfoRules,
  ISetArticleParams, ISetArticleRules,
} from "../constant/rules";
import StatisticService from "../service/StatisticService";
import {T_B_ARTICLE_DETAIL, T_B_ARTICLE_LIST} from "../constant/tracertsMap";

class ArticleController {
  /**
   * 前台文章列表
   * @param ctx
   */
  async getListForFront(ctx: Context) {
    const {data, error} = await validator<IPageInfoParams>(ctx, IPageInfoRules);
    if (error !== null) return fail(ctx, error);
    // 文章列表访问
    await StatisticService.updateViewCounts(T_B_ARTICLE_LIST);

    const {current, pageSize} = data;
    const articleList = await ArticleService.getListForFront(Number(current), Number(pageSize));
    const total = await ArticleService.countRecords()
    pageInfoSuccess(ctx, articleList, {...data, total});
  }

  /**
   * 管理后台分页获取文章列表
   * @param ctx
   */
  async getListForBackend(ctx: Context) {
    const {data, error} = await validator<IPageInfoParams>(ctx, IPageInfoRules);
    if (error !== null) return fail(ctx, error);
    const {current, pageSize} = data;

    const articleList = await ArticleService.getListForBackend(Number(current), Number(pageSize));
    const total = await ArticleService.countRecords()
    pageInfoSuccess(ctx, articleList, {...data, total});
  }

  /**
   * 获取文章详情
   * @param ctx
   */
  async getDetail(ctx: Context) {
    const {data, error} = await validator<IGetArticleDetailParams>(ctx, IGetArticleDetailRules);
    if (error !== null) return fail(ctx, error);
    const {id} = data;
    // 文章详情页访问
    await StatisticService.updateViewCounts(T_B_ARTICLE_DETAIL);

    const articleDetail = await ArticleService.getDetail(id);
    success(ctx, articleDetail);
  }


  async add(ctx: Context) {
    // 参数校验
    const {data, error} = await validator<IAddArticleParams>(ctx, IAddArticleRules);
    if (error !== null) return fail(ctx, error);

    await ArticleService.addArticle(data);
    success(ctx);
  }

  async set(ctx: Context) {
    // 参数校验
    const {data, error} = await validator<ISetArticleParams>(ctx, ISetArticleRules);
    if (error !== null) return fail(ctx, error);

    const [affectRows] = await ArticleService.setArticle(data);
    if (!affectRows) return fail(ctx);
    success(ctx);
  }

  async updateViews(ctx: Context) {
    // 参数校验
    const {data, error} = await validator<IGetArticleDetailParams>(ctx, IGetArticleDetailRules);
    if (error !== null) return fail(ctx, error);

    const [affectRows] = await ArticleService.updateViews(data);
    if (!affectRows) return fail(ctx);
    success(ctx);
  }
}

export default new ArticleController();
