import koaRouter from "koa-router";
import TypeController from "../controller/TypeController";

const router = new koaRouter({ prefix: "/article" });
router.get("/queryType.json", TypeController.getForFront);
router.get("/queryTypeForBackend.json", TypeController.getForBackend);
router.post("/addType.json", TypeController.add);
router.post("/setType.json", TypeController.set);

module.exports = router;
