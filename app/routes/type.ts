import koaRouter from "koa-router";
import TypeController from "../controller/TypeController";

const router = new koaRouter({prefix: "/article"})
router.get("/queryType", TypeController.get)
router.post("/addType", TypeController.add)
router.post("/setType", TypeController.set)

module.exports = router
