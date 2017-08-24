const bcrypt = require('bcryptjs')

const config = require('../config')
const bookshelf = require('../helpers/bookshelf')
global.User = bookshelf.Model.extend({
    tableName: 'user',
    checkPassword: async function (password) {
        return await bcrypt.compare(password, this.get('password'))
    },
    hashPassword: async function(model, attrs) {
        const password = await bcrypt.hash(model.get('password'), config.salt)
        model.set('password', password)
        return
    },
    initialize: function() {
        this.on('saving', this.hashPassword)
    }
})
