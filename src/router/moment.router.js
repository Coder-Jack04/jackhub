const Router = require('koa-router')

const {
  verifyAuth,
  verifyPermisssion
} = require('../middleware/auth.middleware')
const { 
  create,
  list,
  detail,
  update,
  remove,
  addLabels,
  fileInfo 
} = require('../controller/moment.controller')
const {
  verifyLabelExists
} = require('../middleware/label.middleware')

const momentRouter = new Router({prefix: '/moment'})

// 1. 实现发表动态接口
// 将当前用户的动态在body中传递过来
// 需要验证当前用户是否已经登录
momentRouter.post('/', verifyAuth, create)

// 2. 实现获取动态列表接口
// 请求 {{base_url}}/moment?offset=0&limit=10
momentRouter.get('/', list);


// 3. 实现获取动态详情接口
// 请求 {{base_url}}/moment/:momentId
momentRouter.get('/:momentId', detail)

// 4. 实现修改动态接口
// 用户必须登录, 用户必须拥有权限, 才能修改
momentRouter.patch('/:momentId', verifyAuth, verifyPermisssion, update)

// 5. 实现删除动态接口
// 实现思路和修改动态接口类似,首先验证是否登录, 是否具有权限
momentRouter.delete('/:momentId', verifyAuth, verifyPermisssion, remove)

// 6. 在获取动态的接口中将对应的评论信息也进行返回
// 在动态列表中, 将当前动态的评论信息的个数进行返回
// 在动态详情中, 将所有的动态以对象数组的形式进行返回

// 7. 实现给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermisssion, verifyLabelExists, addLabels)


// 8. 获取动态的配图接口
momentRouter.get('/images/:filename', fileInfo)

module.exports = momentRouter
