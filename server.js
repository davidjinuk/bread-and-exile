"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

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

const data = {};
let order_id = generateRandomString();


// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/menu", (req, res) => {
  res.render("menu");
});

app.get("/api/cart", (req, res) => {
  knex
    .select("*")
    .from("menues")
    .where({"id": 1}).orWhere({"id": 8}).orWhere({"id": 3})
    .then((results) => {
      res.json(results);
  });
// });
//   res.json(data);
});
app.get("/cart", (req,res) => {
  let templateVars = {
    order_id: order_id,
    database: data
  }
  res.render("cart", templateVars);
});

app.post("/checkout", (req,res) => {
  res.render("confirmation");

})

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
        if(obj.id === item_id){
          console.log("Item already in array");
          obj.item_quantity = item_quantity;
          obj.order_total = order_total;
          condition = true;
       }

     });

     if(!condition) {
       console.log("Item shouldn't be in array");
       orderArr.push({ // hamburger
           "id": item_id,
           "item_quantity": item_quantity,
           "order_total": order_total
         })
       }

    } else {
        data[order_id] = [{ //hotdog
            "id": item_id,
            "item_quantity": item_quantity,
            "order_total": order_total
          }]
          }
        }

  // addItemToCart(1, 3, 5);
  console.log(data);
});



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

function generateRandomString() {
 var result = Math.random().toString(36).substr(2, 6);
 return result;
}
