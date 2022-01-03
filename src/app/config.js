const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv');

dotenv.config();

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'))
const PUBLICE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

module.exports = {
  APP_HSOT,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_DATABASE,
  MYSQL_PASSWORD,
  MYSQL_CONNECTIONLIMIT,
} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLICE_KEY = PUBLICE_KEY
