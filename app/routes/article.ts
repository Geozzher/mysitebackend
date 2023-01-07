import koaRouter from "koa-router";
import ArticleController from "../controller/ArticleController";

const router = new koaRouter({ prefix: "/article" });
// 前台接口
router.get("/getArticleList.json", ArticleController.getListForFront);
router.get("/queryOne.json", ArticleController.getDetail);
router.get("/updateViews.json", ArticleController.updateViews);

// 管理后台接口
router.get("/getArticleListForBackend.json", ArticleController.getListForBackend);
router.get("/queryOneForBackend.json", ArticleController.getDetailForBackend);
router.post("/addOne.json", ArticleController.add);
router.post("/modifyArticle.json", ArticleController.set);


module.exports = router;
