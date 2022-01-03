const Router = require('koa-router')

const {
  verifyAuth
} = require('../middleware/auth.middleware')
const {
  create,
  list
} = require('../controller/label.controller.js')
const labelRouter = new Router({prefix: '/label'})

// 实现创建标签接口
// 实现思路: 用户只有登录了, 才能创建对应的标签, 跟授权不存在什么关系
labelRouter.post('/', verifyAuth, create)

// 获取某条动态的标签列表
labelRouter.get('/', list)
// 实现发表动态时, 对动态添加标签
// 实现获取动态列表时, 获取其对应的标签数量
// 实现获取动态详情时, 获取其对应的标签数据
module.exports = labelRouter