exports.seed = function(knex, Promise) {
  return knex('orders').del()
    .then(function () {
      return Promise.all([

      ]);
    });
};
