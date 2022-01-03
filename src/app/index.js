const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()


// const usersRouter = require('../router/user.router')
const errorHandler = require('../app/error-handle')

// const authRouter = require('../router/auth.router')
const useRouter = require('../router')
app.useRouter = useRouter
// 在这里注册中间件
// 如果将所有的路由都在这里注册, 将使index.js中的代码显得特别臃肿
// 我们可以在router文件夹中创建一个index.js文件, 动态获取文件夹中的文件
// 然后在那里进行加载
app.use(bodyParser())

// app.use(usersRouter.routes())
// app.use(usersRouter.allowedMethods())

// app.use(authRouter.routes())
// app.use(authRouter.allowedMethods())
app.useRouter()

app.on('error', errorHandler)
module.exports = app