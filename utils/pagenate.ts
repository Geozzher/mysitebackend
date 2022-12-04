import {Model} from "sequelize-typescript"

function pagenate<T extends Model[]>(data: T, currentPage: number = 1, total: number = 0, pageSize: number = 15) {
  return {
    data,
    currentPage,
    total,
    totalPage: Math.ceil(total / pageSize),
    pageSize
  }
}


export default pagenate
