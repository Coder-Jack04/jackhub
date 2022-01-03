const mysql2 = require('mysql2')

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_DATABASE,
  MYSQL_PASSWORD,
  MYSQL_CONNECTIONLIMIT
} = require('../app/config')
const pool = mysql2.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  database: MYSQL_DATABASE,
  password: MYSQL_PASSWORD,
  connectionLimit: MYSQL_CONNECTIONLIMIT
})

pool.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log("连接失败:", err);
    } else {
      console.log('数据库连接成功~');
    }
  })
})

module.exports = pool.promise()

