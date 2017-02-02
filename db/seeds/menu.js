exports.seed = function(knex, Promise) {
  return knex('menues').del()
    .then(function () {
      return Promise.all([
        knex('menues').insert({id: 1, name: 'pizza', price: 10, description: 'Tasty pizza!'}),
        knex('menues').insert({id: 2, name: 'burger', price: 5, description: 'Tasty burger!'}),
        knex('menues').insert({id: 3, name: 'chips', price: 2, description: 'Tasty chips!'})
      ]);
    });
};
