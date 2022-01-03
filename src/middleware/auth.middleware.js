const md5password = require('../utils/password-handle')
const userService = require('../service/user.service')
const errorTypes = require('../constants/error-types')
const authService = require('../service/auth.service')

const jwt = require('jsonwebtoken')
const { PUBLICE_KEY } = require('../app/config')

const verifyLogin = async (ctx, next) => {
  // 1. 获取账号和密码
  const {name, password} = ctx.request.body

  // 2. 对账号和密码是否为空进行验证
  if (!(name && password)) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx)
  }
  // 3. 去数据库中进行查询, 看看是否存在用户名
  const result = await userService.getUserByName(name)
  const user = result[0]
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 4. 判断密码是否和数据库中的密码是一致的(加密, 然后对比加密后的密码) 
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
    return ctx.app.emit('error', error, ctx);
  }
  ctx.user = user;
  await next();
}

const verifyAuth = async (ctx, next) => {
  // 验证授权
  console.log('验证授权的middleware');
  // 1. 获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace("Bearer ", "");
  // 2. 验证token(id, name/iat/exp)
  try {
    const result = jwt.verify(token, PUBLICE_KEY, {
      algorithms: ["RS256"]
    })
    ctx.user = result
    await next()
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }
}
/* 
  1. 很多的接口都需要进行权限的验证: 修改/删除动态, 修改/删除评论
  2. 接口: 业务接口/后台管理系统接口
   一对一:user -> role
   多对多 role -> menu
  3. 实现思路: 我们这里要实现一个更通用的权限验证函数
  规定只要是进行权限验证, 都需要传入对应的要修改的表的名称+Id
  这样就可以动态获取表的名称, 然后就可以去响应的表中进行信息的查询了
*/
const verifyPermisssion = async (ctx, next) => {
  // 1. 获取用户要修改的动态 {commentId: 1}和用户的信息
  // 这里的resourceKey就是要修改的内容的值
  const [resourceKey] = Object.keys(ctx.params);
  const tableName = resourceKey.replace('Id', '')
  const resourceId = ctx.params[resourceKey];
  const { id } = ctx.user;
  // 2. 进行数据库操作, 去响应的表中进行查找
  try {
    const isPermission = await authService.checkResource(tableName, resourceId, id);
    if (!isPermission) throw new Error();
    await next()
  } catch (err) {
    const error = new Error(errorTypes.UNPERMISSION);
    ctx.app.emit('error', error, ctx)
  }
}
module.exports =  {
  verifyLogin,
  verifyAuth,
  verifyPermisssion
}