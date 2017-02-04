exports.seed = function(knex, Promise) {
  return knex('menues').del()
    .then(function () {
      return Promise.all([
        knex('menues').insert({id: 1, name: 'Locavore ironic-loaf', price: 10, description: 'Our locavore bread. Every ingredient was sourced within 5 miles after being flown from China. Includes foraged ingredients from urban Vancouver - this bread will remind you of flannel and sriracha.', img_url: 'https://cdn.shopify.com/s/files/1/0790/5353/files/rye-bread-slice-isolated-white-background-31963071.jpg?17591865817039880213'}),
        knex('menues').insert({id: 2, name: 'Molecular gastronomy loaf', price: 5, description: 'This artisan slice of bread was sliced at exactly 40 degrees celsius to reduce its nutrient loss. The grain was grown in Berlin and Portland and flown over packed in kale chips. Perfectly pairs with a tall pour of sour craft beer on a cloudy day.', img_url: 'https://cdn.shopify.com/s/files/1/0790/5353/files/172782814.jpg?17107883462063865267'}),
        knex('menues').insert({id: 3, name: 'It’s not Toast loaf', price: 2, description: 'Our classic loaf reinvented. This classic loaf has been put through a careful process to crisp all edges of the bread. It is hand placed into the heated compartment where the classic loaf reinvents itself into a bread with a light crunchy bite. Perfectly pairs with a Pabst Blue Ribbon.', img_url: 'https://cdn.shopify.com/s/files/1/0790/5353/files/a8fg34.jpg?17591865817039880213'}),
        knex('menues').insert({id: 4, name: 'Round Loaf', price: 5, description: 'This round loaf is a Bread & Exile specialty. Our signature design changes the way you hold your bread. Filled with activated charcoal, chia seeds, and ramps. This kombucha flavoured loaf will get you there.', img_url: 'https://cdn.shopify.com/s/files/1/0790/5353/files/bagel_stock_image_-_Google_Search_2017-02-04_10-35-52.jpg?17591865817039880213'}),
        knex('menues').insert({id: 5, name: 'Meditation circle loaf', price: 8, description: 'Small batch succulent seeds are scattered all over this B&E customer favourite. Perfect for a dose of pre-meditation probiotics. Pairs well with healing crystals and self reflection.', img_url: 'https://cdn.shopify.com/s/files/1/0790/5353/files/bagel_stock_image_-_Google_Search_2017-02-04_10-35-52.jpg?17591865817039880213'})
      ]);
    });
};
