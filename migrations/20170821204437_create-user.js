
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', table => {
        table.increments().primary()
        table.string('username')
        table.string('password')
        table.index('username')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user')
};
