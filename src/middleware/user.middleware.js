const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const md5password = require('../utils/password-handle')

const verifyUser = async (ctx, next) => {
  // 1.获取到传入的账号和密码

  const { name, password } = ctx.request.body
  console.log(name, password);
  // 2. 判断用户名或者密码不能为空
  if (!(name && password)) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 3. 判断这次注册的用户名是没有被注册过的
  // 需要从数据库中进行查询看看该用户名是否存在
  const result = await userService.getUserByName(name)
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

const handlePassword = async (ctx, next) => {
  let { password } = ctx.request.body;
  ctx.request.body.password = md5password(password)
  await next()
}
module.exports = {
  verifyUser,
  handlePassword
}