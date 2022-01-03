const connection = require('../app/database')

class CommentService {
  async create (content, momentId, id) {
    const statement = `
    INSERT INTO comment (content, moment_id, user_id) VALUE (?, ?, ?);
    `
    const [result] = await connection.execute(statement, [content, momentId, id])
    return result;
  }
  async reply(content, momentId, commentId, id) {
    console.log(content, momentId, commentId, id);
    const statement = `
    INSERT INTO comment (content, moment_id, user_id, comment_id) VALUE (?, ?, ?, ?);
    `
    const [result] = await connection.execute(statement, [content, momentId, id, commentId])
    return result;
  }
  async update(content, commentId) {
    console.log(content, commentId);
    const statement = `
    UPDATE comment SET content = ? WHERE id = ?
    `;
    const [result] = await connection.execute(statement, [content, commentId]);
    return result;
  }
  async remove(commentId) {
    const statement = `
    DELETE FROM comment WHERE id = ?
    `;
    const [result] = await connection.execute(statement, [commentId]);
    return result
  }
  async getCommentsByMomentId(momentId, offset, limit) {
    const statement = `
    SELECT * FROM comment WHERE moment_id = ? LIMIT ?, ?;
    `;
    const [result] = await connection.execute(statement, [momentId, offset, limit]);
    return result
  }
}

module.exports = new CommentService();