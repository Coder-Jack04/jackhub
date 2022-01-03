
const {
  APP_HSOT,
  APP_PORT,
} = require('../app/config');
const userService = require('../service/user.service');
const fileService = require('../service/file.service')
class FileController {
  async saveAvatarInfo (ctx, next) {
    // 1. 获取图像相关的信息以及用户信息
    const { filename, mimetype, size } = ctx.req.file;
    const { id } = ctx.user

    // 2. 将图像信息保存到数据库中
    const result = await fileService.createAvatar(filename, mimetype, size, id)
    // 3. 将图片地址保存到users表中, 构建一对一关系
    // 注意, 这里保存的地址是对应的url, 而不是路径地址
    const avatarUrl = `${APP_HSOT}:${APP_PORT}/users/${id}/avatar`
    await userService.updateAvatarUrlById(avatarUrl, id);
    // 4. 返回结果
    ctx.body = '上传头像成功~'
  }
  async savePictureInfo (ctx, next) {
    // 1. 获取图像相关的信息以及用户信息
    const files = ctx.req.files;
    const { id } = ctx.user;
    const { momentId } = ctx.query;

    // 2. 将所有的文件信息保存到数据库中
    for (const file of files) {
      const { filename, mimetype, size } = file;
      await fileService.createFile(filename, mimetype, size, id, momentId);
    }
    ctx.body = '动态配图上传完成~'
  }
}

module.exports = new FileController();