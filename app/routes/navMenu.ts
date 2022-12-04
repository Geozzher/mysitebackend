import koaRouter from "koa-router";
import NavMenuController from "../controller/NavMenuController";

const router = new koaRouter({prefix: "/nav"})
router.get("/query", NavMenuController.get)
router.post("/addMenu", NavMenuController.add)
router.post("/modifyMenu", NavMenuController.set)

module.exports = router
