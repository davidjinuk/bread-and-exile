exports.up = function(knex, Promise) {
  return knex.schema.createTable('menues', function (table) {
    table.increments();
    table.string('name');
    table.integer('price');
    table.string('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('menues');
};
