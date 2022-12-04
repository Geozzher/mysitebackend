import {configure, getLogger} from "log4js";

//todo can't import log config from config
configure({
  appenders: {
    cheese: {type: "file", filename: "logs/cheese.log"},
    access: {type: "file", filename: "logs/access.log"},
    db: {type: "file", filename: "logs/db.log"},
  },
  categories: {
    default: {appenders: ["cheese"], level: "info"},
    access: {appenders: ["access"], level: "info"},
    db: {appenders: ["db"], level: "info"},
  }
})

export const accessLogger = getLogger('access')
export const dbLogger = getLogger('db')
export default getLogger()
