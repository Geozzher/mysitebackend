import {Context} from 'koa'
import {success} from '../../utils/response'

class IndexController {
  async index(ctx: Context) {
    success(ctx, "hello koa!")
  }
}

export default new IndexController()
