const path = require('path')

// 对上传的图片进行处理, 需要使用multer库
const multer = require('koa-multer')

const jimp = require('jimp')
const {
  AVATAR_PATH,
  PICTURE_PATH
} = require('../constants/file-path')
const avatarUpload = multer({
  dest: AVATAR_PATH
})

const avatarHandler = avatarUpload.single('avatar')

const pictureUpload = multer({
  dest: PICTURE_PATH
})
const pictureHandler = pictureUpload.array('picture', 9)

const pictureResize = async (ctx, next) => {
  // 使用第三方库jimp来对图片的大小进行处理
  // jimp相对于sharp来说更轻量级
  try {
    // 1. 获取所有图像的信息
    const files = ctx.req.files
    console.log(files);
    // 2. 对图像进行处理
    for (const file of files) {
      const destPath = path.join(file.destination, file.filename)
      jimp.read(file.path).then(image => {
        image.resize(1280, jimp.AUTO).write(`${destPath}-large`)
        image.resize(640, jimp.AUTO).write(`${destPath}-middle`)
        image.resize(320, jimp.AUTO).write(`${destPath}-small`)
      })
    }
    await next()
  } catch (err) {
    console.log(err);
  }

}

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize
}