const slug = require('slug')
const bookshelf = require('../helpers/bookshelf')

global.Tag = bookshelf.Model.extend({
    tableName: 'tag',
    posts: function () {
        return this.belongsToMany(global.Post)
    },
    slugUniqueName: function (model, attrs) {
        const name = model.get('name')
        model.set('uniqueName', slug(name))
    },
    initialize: function() {
        this.on('saving', this.slugUniqueName)
    }
})
