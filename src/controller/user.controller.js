const fs = require('fs')

const fileService = require('../service/file.service');
const userService = require('../service/user.service')
const {
  AVATAR_PATH
} = require('../constants/file-path')
class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body;

    // 查询数据
    const result = await userService.create(user);
    if (result.insertId) {
      ctx.body = '用户创建成功~'
    } else {
      ctx.body = '用户创建失败~'
    }
  }
  async avatarInfo(ctx, next) {
    // 1. 获取用户的id
    const { userId } = ctx.params;
    
    // 2. 去数据库中查询这个文件的位置
    const avatarInfo = await fileService.getAvatarByUserId(userId)
    // 3. 将文件返回
    // 这里需要注意的是, 如果我们不设置文件的格式, 那么默认会将我们的图像直接下载
    // 因此我们需要在返回的头部信息中修改文件的格式
    ctx.response.set('content-type', avatarInfo.mimetype)
    
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
  }
}

module.exports = new UserController();