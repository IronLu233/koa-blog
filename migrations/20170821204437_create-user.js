
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', table => {
        table.increments().primary()
        table.string('username')
        table.string('password')
        table.string('token')
        table.index('token')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user')
};
