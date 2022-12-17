import koaRouter from "koa-router";
import ArticleController from "../controller/ArticleController";

const router = new koaRouter({ prefix: "/article" });
router.get("/getArticleList.json", ArticleController.getListForFront);
router.get("/getArticleListForBackend.json", ArticleController.getListForBackend);
router.get("/queryOne.json", ArticleController.getDetail);
router.post("/addOne.json", ArticleController.add);
router.post("/modifyArticle.json", ArticleController.set);

module.exports = router;
