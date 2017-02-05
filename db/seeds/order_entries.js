exports.seed = function(knex, Promise) {
  return knex('order_entries').del()
    .then(function () {
      return Promise.all([

      ]);
    });
};
