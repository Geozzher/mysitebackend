import koaRouter from "koa-router";
import TagController from "../controller/TagController";

const router = new koaRouter({prefix: "/article"})
router.get("/queryTag", TagController.get)
router.post("/addTag", TagController.add)
router.post("/setTag", TagController.set)

module.exports = router
