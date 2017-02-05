exports.up = function(knex, Promise) {
  return knex.schema.table('orders', function (table) {
    table.dropColumn('id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('orders', function (table) {
    table.increments('id');
  });
};
