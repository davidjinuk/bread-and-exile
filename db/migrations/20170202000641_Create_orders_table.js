exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', function (table) {
    table.increments('id');
    table.integer('total');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};
