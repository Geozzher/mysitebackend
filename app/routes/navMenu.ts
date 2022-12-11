import koaRouter from "koa-router";
import NavMenuController from "../controller/NavMenuController";

const router = new koaRouter({ prefix: "/nav" });
router.get("/query.json", NavMenuController.getForFront);
router.get("/queryForBackend.json", NavMenuController.getForBackend);
router.post("/addMenu.json", NavMenuController.add);
router.post("/modifyMenu.json", NavMenuController.set);

module.exports = router;
