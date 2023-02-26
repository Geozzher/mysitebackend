import dotenv from "dotenv";
import path from "path";

const envPath = process.env.NODE_ENV === 'production' ? '../env.remote' : '../env'
const envConfig = dotenv.config({
  path: path.resolve(__dirname, envPath), // 配置文件路径
  encoding: 'utf8', // 编码方式，默认utf8
  debug: false, // 是否开启debug，默认false
}).parsed;

if (!envConfig) {
  console.log('配置文件不存在');
  // 退出程序
  process.exit(1);
}
import db from "../app/db";

db();

import Koa from "koa";
import {Server} from "http";
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
      jsonLimit: 50 * 1024 * 1024
    })
  )
  .use(AccessLogMiddleware)
  .use(AuthMiddleware)
// .use(router.routes())

// 注册路由
const routing = require("./routes");
routing(app);

const run = (port: any): Server => {
  return app.listen(port);
};

export default run;
