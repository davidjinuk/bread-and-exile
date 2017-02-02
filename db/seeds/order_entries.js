exports.seed = function(knex, Promise) {
  return knex('order_entries').del()
    .then(function () {
      return Promise.all([
        knex('order_entries').insert({'item_id': 1, 'order_id': 1, 'item_quantity': 3, 'order_total': 32}),
        knex('order_entries').insert({'item_id': 2, 'order_id': 2, 'item_quantity': 3, 'order_total': 32}),
        knex('order_entries').insert({'item_id': 3, 'order_id': 3, 'item_quantity': 3, 'order_total': 32})
      ]);
    });
};
