
exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', function(table) {
      table.increments();
      table.string('name', 128);
      table.string('description', 255);
      table.boolean('completed')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('projects')
};
