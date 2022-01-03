const fs = require('fs')
const momentService = require('../service//moment.service')
const {
  PICTURE_PATH
} = require('../constants/file-path')
const fileService = require('../service/file.service')
const errorTypes = require('../constants/error-types')
class MommentController {
  async create(ctx, next) {
    // 1. 获取用户数据(user_id, content)
    const userId = ctx.user.id;
    const content = ctx.request.body.content

    // 2. 将数据插入到数据库中
    const result = await momentService.create(userId, content)
    ctx.body = result
  }
  async list (ctx, next) {
    console.log('list');
    //可以通过在url中通过offset和limit进行分页查询
    // 1. 获取offset和limit数据
    const { offset, limit} = ctx.query;
    console.log(offset, limit);

    // 2. 去数据库中进行查新
    const result = await momentService.getMomentList(offset, limit)
    ctx.body = result;

  }
  async detail (ctx, next) {
    // 1. 获取评论的具体的id
    const mommentId = ctx.params.momentId
    console.log(mommentId);
    // 2. 根据id去查询具体的动态
    const result = await momentService.getMomentById(mommentId);
    ctx.body = result;
  }
  async update (ctx, next) {
    // 1. 获取评论的具体的id和修改内容
    const mommentId = ctx.params.momentId
    console.log(mommentId);
    const content = ctx.request.body.content
    console.log(content);
    // 2. 根据id去进行修改
    const result = await momentService.updateMomentById(mommentId, content)
    ctx.body = result
  }
  async remove (ctx, next) {
    // 1. 获取评论的具体的id和修改内容
    const mommentId = ctx.params.momentId
    console.log(mommentId);
    // 2. 根据id去进行修改
    const result = await momentService.removeMomentById(mommentId)
    ctx.body = result
  }
  async addLabels (ctx, next) {
    // 1. 获取标签的信息
    const { labels } = ctx
    const { momentId } = ctx.params
    // 2. 对数据进行处理
    // 首先需要判断当前的moment里面是否存在该标签, 如果存在就不处理
    // 如果不存在就将其添加
    for (const label of labels) {
      const isExists = await momentService.hasLabel(momentId, label.id)
      if (!isExists) {
        await momentService.addLabels(momentId, label.id)
      }
    }
    ctx.body = '给动态添加标签成功~'
  }
  async fileInfo (ctx, next) {
    // 获取文件信息
    let { filename } = ctx.params;
    const fileInfo = await fileService.getFileByFilename(filename);
    console.log(fileInfo);
    if (!fileInfo) {
      const error = new Error(errorTypes.PICTURE_IS_NOT_EXISTS);
      ctx.app.emit('error', error, ctx)
    } else {
      const { type } = ctx.query;
      const types = ['small', 'middle', 'large'];
      if (types.some(item => item === type)) {
        filename = filename + '-' + type;
      }

      ctx.response.set('content-type', fileInfo.mimetype);
      ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
    }
  }
}


module.exports = new MommentController()