const multer = require('koa-multer')
const path = require('path')

const config = require('../config')

const uploadKit = multer(config.multer)

module.exports = uploadKit
