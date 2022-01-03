const Router = require('koa-router')
const { 
  verifyAuth, 
  verifyPermisssion 
} = require('../middleware/auth.middleware')
const { 
  create,
  reply,
  update,
  remove,
  list
} = require('../controller/comment.controller')


const commentRouter = new Router({prefix: '/comment'})

// 1. 创建评论接口(发表评论接口)
commentRouter.post('/', verifyAuth, create)

// 2. 创建评论回复接口
commentRouter.post('/:commentId/reply', verifyAuth, reply); 

// 3. 修改评论接口
commentRouter.patch('/:commentId', verifyAuth, verifyPermisssion, update)
// 4. 删除评论接口
commentRouter.delete('/:commentId', verifyAuth, verifyPermisssion, remove)
// 5. 获取评论列表
// 这里的逻辑应该是获取某一条动态的全部评论列表, 因此, 应该有动态的id可以使用query的方式进行传递
commentRouter.get('/', list)
// 6. 在获取动态的接口中将对应的评论信息也进行返回
// 在动态列表中, 将当前动态的评论信息的个数进行返回
// 在动态详情中, 将所有的动态以对象数组的形式进行返回

module.exports = commentRouter