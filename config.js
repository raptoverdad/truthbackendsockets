const MYSQL_HOST= process.env.MYSQL_HOST || 'localhost'
const CORS_ORIGIN= process.env.CORS_ORIGIN || 'http://localhost:8080'
const PORT=process.env.PORT || 4000
const MYSQL_PASSWORD= process.env.MYSQL_PASSWORD || 'Bnx6aw300172_'
const MYSQL_USER= process.env.MYSQL_USER || 'theraptoreumtruth'
const MYSQL_DATABASE=process.env.MYSQL_DATABASE || 'theraptoreumtruth'
const MYSQL_PORT = process.env.MYSQL_PORT

exports.MYSQL_HOST = MYSQL_HOST
exports.MYSQL_PASSWORD=MYSQL_PASSWORD
exports.CORS_ORIGIN=CORS_ORIGIN
exports.MYSQL_USER=MYSQL_USER
exports.PORT=PORT
exports.MYSQL_DATABASE=MYSQL_DATABASE
exports.MYSQL_PORT=MYSQL_PORT