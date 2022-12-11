import koaRouter from "koa-router";
import TagController from "../controller/TagController";

const router = new koaRouter({ prefix: "/article" });
router.get("/queryTag.json", TagController.getForFront);
router.get("/queryTagForBackend.json", TagController.getForBackend);
router.post("/addTag.json", TagController.add);
router.post("/setTag.json", TagController.set);

module.exports = router;
