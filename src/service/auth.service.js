const connection = require('../app/database')
class authService {
  async checkResource (tableName, resourceId, id) {
    const statement = `
    SELECT * 
    FROM ${tableName}
    WHERE id = ? AND user_id = ?;
    `;
    const [result] = await connection.execute(statement, [resourceId, id])
    return result[0]
  }
}

module.exports = new authService();