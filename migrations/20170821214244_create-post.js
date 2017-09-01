
exports.up = function(knex, Promise) {
    return knex.schema.createTable('post', table => {
        table.increments().primary()
        table.string('title').notNullable()
        table.string('cover')
        table.string('content').notNullable()
        table.string('abstract')
        table.boolean('visible')
        table.timestamp('createAt')
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('post')
}
