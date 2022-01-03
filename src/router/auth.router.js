const Router = require('koa-router')


const authRouter = new Router()

const {
  login, success
} = require('../controller/auth.controller')
const {
  verifyLogin,
  verifyAuth
} = require('../middleware/auth.middleware')
// 思路
// 首先得对用户登录的账号和密码进行验证
// 然后再颁发token, 说明登录成功
authRouter.post('/login', verifyLogin, login)

// 验证授权的接口
authRouter.get('/test', verifyAuth, success)

module.exports = authRouter