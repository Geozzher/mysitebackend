import koaRouter from "koa-router";
import RecommendController from "../controller/RecommendController";

const router = new koaRouter({ prefix: "/recommendation" });
router.get("/queryRecommendation.json", RecommendController.getForFront);

module.exports = router;
