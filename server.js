"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const twilio      = require("./public/scripts/twilio");
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const twil = require("twilio");
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const menuesRoutes = require("./routes/menues");
const ordersRoutes = require("./routes/orders");
const order_entriesRoutes = require("./routes/order_entries");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

app.use("/api/menues", menuesRoutes(knex));

app.use("/api/orders", ordersRoutes(knex));

app.use("/api/order_entries", order_entriesRoutes(knex));

function generateRandomString() {
 var result = Math.random().toString(36).substr(2, 6);
 return result;
}

const data = {};
let order_id = generateRandomString();
let orderCompletionTime = {
  "time": 0
};

app.post("/twilio", (req, res) => {
    let time = req.body.Digits;
    orderCompletionTime = {
      "time": time
    }
    console.log("Your order will be ready in", req.body.Digits, "minutes");
    res.json(time);

});


app.get("/twilio", (req, res) => {

res.json(orderCompletionTime);

})

app.get("/contact", (req, res) =>{

  twilio.textRestaurant("Steven Bamford", data, order_id, process.env.PHONE_NUMBER);
  twilio.callRestaurant("StevenBamford", data, order_id, process.env.PHONE_NUMBER);

});


// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/menu", (req, res) => {
  res.render("menu");
});


app.post("/api/cart", (req, res) => {

  let ids = [];

  data[order_id].forEach((obj) =>{
    ids.push(obj.item_id);
  });

  knex
      .select("*")
      .from("menues")
      .whereIn('id', ids)
      .then((results) => {
      data[order_id].forEach((obj) => {

        let foundObject = results.filter(function(apiobject){
          return obj.item_id == apiobject.id

        })

        if(foundObject){
          obj.description = foundObject[0].description;
          obj.item_price  = foundObject[0].price;
          obj.name = foundObject[0].name;
        }

      });
      res.json(data);

});



});


app.get("/cart", (req,res) => {
  let templateVars = {
    cart: data,
    order_id: order_id
  }
  res.render("cart", templateVars);
});

app.post("/checkout", (req,res) => {

  let total = 0;
  data[order_id].forEach(function (obj){
    total += obj.order_total;
  })

  knex('orders').insert({'order_id': order_id, 'total': total}).then(function (result) {
  });

  data[order_id].forEach(function (obj){

    knex('order_entries').insert({'order_id': order_id, 'item_id': obj.item_id, 'item_quantity': obj.item_quantity, 'order_total': obj.order_total})
    .then(function (result) {
    });

  })

  res.render("confirmation");
});

app.get("/confirmation", (req,res) => {
  res.render("confirmation");
})

app.post("/cart/add", (req,res) => {
  // console.log(req.body.name);
  console.log(req.body.item_quantity);
  console.log(req.body.item_price);

let condition;


addItemToCart();


  function addItemToCart() {
    let item_quantity = Number(req.body.item_quantity);
    let item_id = req.body.item_id
    let item_price = Number(req.body.item_price);
    let order_total = item_quantity * item_price;
    let orderArr = data[order_id];

    if (orderArr) {

      orderArr.forEach(function(obj, index){
        if(obj.item_id === item_id){
          obj.item_quantity = item_quantity;
          obj.order_total = order_total;
          condition = true;
       }

     });

     if(!condition) {
       orderArr.push({
          "order_id": order_id,
           "item_id": item_id,
           "item_quantity": item_quantity,
           "order_total": order_total
         })
       }

    } else {
        data[order_id] = [{
            "order_id": order_id,
            "item_id": item_id,
            "item_quantity": item_quantity,
            "order_total": order_total
          }]
          }
        }
  console.log(data);
});



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
