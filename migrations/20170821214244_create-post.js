
exports.up = function(knex, Promise) {
    return knex.schema.createTable('post', table => {
        table.increments().primary()
        table.string('title')
        table.string('cover')
        table.string('content')
        table.string('abstract')
        table.boolean('visible')
        table.timestamp('createAt')
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('post')
}
