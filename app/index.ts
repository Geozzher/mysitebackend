import dotenv from "dotenv";

dotenv.config();
import db from "../app/db";

db();

import Koa from "koa";
import { Server } from "http";
import AccessLogMiddleware from "./middleware/AccessLogMiddleware";
import AuthMiddleware from "./middleware/AuthMiddleware";
import koaBody from "koa-body";

const app = new Koa();

app
  .use(
    koaBody({
      multipart: true,
      formidable: {
        maxFieldsSize: 200 * 1024 * 1024, // 设置上传文件大小
      },
    })
  )
  .use(AccessLogMiddleware);
// .use(AuthMiddleware)
// .use(router.routes())

// 注册路由
const routing = require("./routes");
routing(app);

const run = (port: any): Server => {
  return app.listen(port);
};

export default run;
