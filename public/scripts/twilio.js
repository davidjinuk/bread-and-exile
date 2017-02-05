const dotenv = require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.PHONE_NUMBER;


const client = require('twilio')(accountSid, authToken);

const data = {};

let orderID = "adsad24";


data[orderID] = [{
    'order_id': "adsad24",
    'item_name': "Hamburger",
    'item_id': 1,
    'item_quantity': 5,
    'order_total': 30,
}]


function stringifyOrder (arr){
  let stringOrder = "";

  arr.forEach((obj) => {
    stringOrder += obj.item_quantity;
    stringOrder += "%20"
    stringOrder += (obj.name + "s");
    stringOrder += ","
  });
    stringOrder = stringOrder.replace("'", "");
    stringOrder = stringOrder.replace(/\s/g, "%20");
    stringOrder = stringOrder.replace("-", "%20");
    return stringOrder;
}

function smsOrder (arr){
  let smsOrder = "";
  arr.forEach((obj) => {
    smsOrder += obj.item_quantity;
    smsOrder += " ";
    smsOrder += obj.name;
    smsOrder += " ";
  });
    return smsOrder;
}


function generateBinUrl(customer, strOrder){

  let url = "https://handler.twilio.com/twiml/EH954d03a8e1d06f8b390bda95cc5a2bc8?Name=" + customer + "&Order=" + strOrder;
  return url;
}

function callRestaurant(customer, db, orderid, number){

  let stringOrder = stringifyOrder(db[orderid]);

  let url = generateBinUrl(customer, stringOrder);

  console.log(url);
  client.calls.create({
     url: url,
     to: "+1" + number,
     from: "+16043301523"
 }, function(err, call) {
     console.log("Call made");
     process.stdout.write(call.sid);
 });
}

function textRestaurant(customer, db, orderid, number){

  let order = smsOrder(db[orderid]);

  client.sms.messages.create({
    to: "+1" + number,
    from:"+16043301523",
    body:"Hi Bread & Exile, " + customer + " ordered " + order
  }, function(error, message) {

    if (!error) {
      console.log('Success! The SID for this SMS message is:');
      console.log(message.sid);
      console.log('Message sent on:');
      console.log(message.dateCreated);
    } else {
      console.log('Oops! There was an error.');
    }
  });
}

module.exports = {

  callRestaurant: callRestaurant,
  textRestaurant: textRestaurant,
}



