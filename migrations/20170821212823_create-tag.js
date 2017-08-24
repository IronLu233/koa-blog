
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tag', table => {
        table.increments().primary()
        table.string('uniqueName').unique().notNullable()
        table.string('name').notNullable()
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tag')
};
