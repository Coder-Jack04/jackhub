
const commentService = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    // 1.获取用户传入的评论信息
    const { content, momentId } = ctx.request.body
    const { id } = ctx.user
    // 2. 将对应的评论信息插入到创建好的comment表中
    const result = await commentService.create(content, momentId, id)
    ctx.body = result;
  }
  async reply(ctx, next) {
    // 1.获取评论的id以及评论的内容
    const { content, momentId } = ctx.request.body
    const { commentId } = ctx.params  
    // 2. 获取用户信息
    const { id } = ctx.user
    // 3.执行相应的数据库操作
    const result = await commentService.reply(content, momentId, commentId, id)
    ctx.body = result;
  }
  async update(ctx, next) {
    // 1. 获取评论的id以及评论的内容
    const { content } = ctx.request.body
    const { commentId } = ctx.params
    // 2. 进行数据库操作
    const result = await commentService.update(content, commentId)
    // 3. 对结果进行返回
    ctx.body = result
  }
  async remove(ctx, next) {
    // 1. 获取要删除的评论信息的id
    const { commentId } = ctx.params
    // 2. 直接对数据库进行操作
    const result = await commentService.remove(commentId)
    // 3. 将结果进行返回
    ctx.body = result;
  }
  async list(ctx, next) {
    const { momentId, offset, limit } = ctx.query
    console.log(offset, limit, momentId);
    // 进行数据库操作
    const result = await commentService.getCommentsByMomentId(momentId, offset, limit)
    ctx.body = result
  }
}

module.exports = new CommentController()