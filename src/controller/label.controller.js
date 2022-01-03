const labelService = require('../service/label.service.js')


class LabelController {
  async create(ctx, next) {
    // 1. 从请求体中获取用户传入的标签名称
    const { name } = ctx.request.body;
    const result = await labelService.create(name)
    ctx.body = result
  }
  async list(ctx, next) {
    const { offset, limit } = ctx.query;
    const result = await labelService.getLabels(offset, limit);
    ctx.body = result;
  }
}

module.exports = new LabelController();