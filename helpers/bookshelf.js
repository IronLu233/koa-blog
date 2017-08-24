const knex = require('knex')
const Bookshelf = require('bookshelf')

const knexConfig = require('../knexfile')
const bookshelf = Bookshelf(knex(knexConfig[process.env.NODE_ENV || 'development']))
bookshelf.plugin('registry')
module.exports = bookshelf
