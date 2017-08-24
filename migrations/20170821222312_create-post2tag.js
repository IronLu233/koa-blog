
exports.up = function(knex, Promise) {
    return knex.schema.createTable('post_tag', table => {
        table.integer('post_id').references('post.id')
        table.integer('tag_id').references('tag.id')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('post_tag')
};
