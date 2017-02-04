exports.up = function(knex, Promise) {
  return knex.schema.table('menues', function (table) {
    table.string("img_url");
    table.dropColumn("description");
  });
}

exports.down = function(knex, Promise) {
   return knex.schema.table('menues', function (table) {
    table.dropColumn('img_url');
    table.string("description");
   });
}
