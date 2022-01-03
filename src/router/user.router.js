const Router = require('koa-router')

const { 
  verifyUser, 
  handlePassword 
} = require('../middleware/user.middleware')
const {
  create,
  avatarInfo
} = require('../controller/user.controller')
const userRouter = new Router({prefix: '/users'})
// 用户注册接口, 对账号密码进行验证然后对密码进行加密处理
userRouter.post('/', verifyUser, handlePassword, create)

// 获取用户头像接口
userRouter.get('/:userId/avatar', avatarInfo)
// 获取动态时还有获取评论时将用户的头像信息展示出来
module.exports = userRouter