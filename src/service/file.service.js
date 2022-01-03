const connection = require('../app/database')

class FileService {
  async createAvatar(filename, mimetype, size, id) {
    const statement = `
      INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);
    `;
    try {
      const [result] = await connection.execute(statement, [filename, mimetype, size, id])
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
    const [result] = await connection.execute(statement, [userId]);
    // console.log(result);
    return result.pop();
  }
  async createFile(filename, mimetype, size, id, momentId) {
    const statement = `
      INSERT INTO file (filename, mimetype, size, moment_id, user_id) VALUES (?, ?, ?, ?, ?);
    `;
    const [result] = await connection.execute(statement, [filename, mimetype,size, momentId, id]);
    return result
  }
  async getFileByFilename(filename) {
    const statement = `SELECT * FROM file WHERE filename = ?;`;
    const [result] = await connection.execute(statement, [filename]);
    return result[0];
  }
}

module.exports = new FileService();