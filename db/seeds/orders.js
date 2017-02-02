exports.seed = function(knex, Promise) {
  return knex('orders').del()
    .then(function () {
      return Promise.all([
        knex('orders').insert({ 'total': 43 }),
        knex('orders').insert({'total': 32}),
        knex('orders').insert({'total': 12})
      ]);
    });
};
