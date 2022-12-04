import koaRouter from "koa-router";
import UserController from "../controller/UserController";

const router = new koaRouter({prefix: "/user"})
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.post("/loginout", UserController.loginOut)
router.post("/update", UserController.update)
router.post("/delete", UserController.delete)
router.post("/single", UserController.findAdminById)
router.post("/verify", UserController.verify)


module.exports = router
