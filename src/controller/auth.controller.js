const jwt = require('jsonwebtoken')
const {
  PRIVATE_KEY,
  PUBLICE_KEY
} = require('../app/config')
class AuthController {
  async login (ctx, next) {
    // 1. 获取用户名和密码
    const {id, name} = ctx.user;
    // 2, 颁发token
    const token = jwt.sign({id, name}, PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 60 * 60 * 24
    })
    // 3. 返回给客户端
    ctx.body = token
  }
  async success (ctx, next) {
    ctx.body = '授权成功~'
  }
}

module.exports = new AuthController()