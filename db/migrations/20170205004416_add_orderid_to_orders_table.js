exports.up = function(knex, Promise) {
  return knex.schema.table('orders', function (table) {
    table.string('order_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('orders', function (table) {
    table.dropColumn('order_id');
  });
};
