const fs = require('fs')

// @ts-ignore
module.exports = (app) => {
  fs.readdirSync(__dirname).forEach((file: string) => {
    if (file === 'index.ts') return

    const router = require(`./${file}`)
    if(!router) {
      console.log(`${file} 注册失败`)
      return;
    }

    app.use(router.routes()).use(router.allowedMethods())
  })
}
