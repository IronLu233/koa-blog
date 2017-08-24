const bookshelf = require('../helpers/bookshelf')

global.Post = bookshelf.Model.extend({
    tableName: 'post',
    tags: function () {
        return this.belongsToMany(global.Tag)
    }
})
