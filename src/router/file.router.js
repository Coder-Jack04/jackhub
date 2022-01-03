const Router = require('koa-router')

const {
  verifyAuth
} = require('../middleware/auth.middleware')

const {
  saveAvatarInfo,
  savePictureInfo
} = require('../controller/file.controller')

const {
  avatarHandler,
  pictureHandler,
  pictureResize
} = require('../middleware/file.middleware')
const fileRouter = new Router({prefix: '/upload'})

// 上传用户头像的接口
// 需要用户登录, 需要对图像进行处理 需要保存图像信息
fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo)
// 实现从浏览器中直接获取头像图像的接口


// 上传动态图片的接口
fileRouter.post('/picture', verifyAuth, pictureHandler, pictureResize, savePictureInfo)
module.exports = fileRouter