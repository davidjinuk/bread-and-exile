exports.up = function(knex, Promise) {
  return knex.schema.createTable('order_entries', function (table) {
    table.increments();
    table.integer('order_id');
    table.integer('item_id');
    table.integer('item_quantity');
    table.integer('order_total');
    // table.foreign('order_id').references('orders.id');
    table.foreign('item_id').references('menues.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order_entries');
};
