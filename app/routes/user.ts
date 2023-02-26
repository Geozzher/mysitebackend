import koaRouter from "koa-router";
import UserController from "../controller/UserController";

const router = new koaRouter({ prefix: "/user" });
router.post("/register.json", UserController.register);
router.post("/login.json", UserController.login);
router.post("/loginout.json", UserController.loginOut);
router.post("/update.json", UserController.update);
router.post("/delete.json", UserController.delete);
router.post("/single.json", UserController.findAdminById);
router.get("/sessionCheck.json", UserController.sessionCheck);
router.get("/verify.json", UserController.verify);
module.exports = router;
