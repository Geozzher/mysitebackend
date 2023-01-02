import koaRouter from "koa-router";
import StatisticController from "../controller/StatisticController";

const router = new koaRouter({ prefix: "/statistic" });
router.get("/updateViewCounts.json", StatisticController.updateViewCounts);

module.exports = router;
