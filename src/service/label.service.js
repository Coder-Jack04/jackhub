const connection = require('../app/database')

class LabelService {
  async create(name) {
    // 首先需要在数据库中创建一个label的表, 然后将我们的数据插入到其中就完成了创建
    const statement = `
    INSERT INTO label (name) VALUES (?);
    `;
    const [result] = await connection.execute(statement, [name])
    return result;
  }
  async getLabels(offset, limit) {
    const statement = `
      SELECT * FROM label LIMIT ?, ?;
    `;
    const [result] = await connection.execute(statement, [offset, limit]);
    return result;
  }
  // 实现查询标签表中是否存在某一个标签
  async getLabelByName(name) {
    const statement = `
      SELECT * FROM label WHERE name = ?;
    `;
    const [result] = await connection.execute(statement, [name]);
    return result[0];
  }
}

module.exports = new LabelService()