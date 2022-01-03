const connection = require('../app/database')

// 将一些查询的方法封装为类方法

class UserService {
  async create(user) {
    const { name, password } = user
    const statement = `INSERT INTO users (name, password) VALUES (?, ?);`
    const result = await connection.execute(statement, [name, password])
    return result[0];
  }
  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`
    const result = await connection.execute(statement, [name])
    return result[0]
  }
  async updateAvatarUrlById(avatarUrl, id) {
    try {
      const statement = `
        UPDATE users SET avatar_url = ? WHERE id = ?;
      `;
      const [result] = await connection.execute(statement, [avatarUrl, id])
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new UserService()