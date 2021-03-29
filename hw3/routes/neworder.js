/* Carina Pineda 
March 28 2021 */

var express = require('express');
var router = express.Router();
var dbms = require('./dbms_promise');



/* POST users listing. */
router.use(express.json());
router.post('/', function(req, res, next) {

   //getting the quantity, topping, and notes
const quantity = req.body.quantity;
const topping = req.body.toppings;
const notes = req.body.notes;

// const month = "MAY"; 
// const day = 14;


//start the query, selecting the max order if from the orders table in the database 
dbms.dbquery( "SELECT MAX(ORDERID) FROM ORDERS;")
   .then(function(dataBaseResponse){
      return dataBaseResponse[0]["MAX (ORDERID)"];
   })
   .then(function(maxorder){
      return maxorder +1;
   })
   .then(function(order){

      //console.log
      console.log(`NEW ORDER - ORDERID: ${order}, MONTH: ${month}, DAY ${day}, QUANTITY: ${quantity}, TOPPING: ${topping}, NOTES: ${notes}`);
      
      //hardcoded the values into the database 
      return dbms.dbquery('INSERT INTO ORDERS (ORDERID, MONTH, DAY, QUANTITY, TOPPING, NOTES) VALUES (70, "MAY", 17, 1, "plain", "Homework 5 Resubmission loves cheesecake!!")');
      //return dbms.dbquery(`INSERT INTO ORDERS (ORDERID, MONTH, DAY, QUANTITY, TOPPING, NOTES) VALUES (${order}, ${month}, ${day}, ${quantity}, ${topping}, ${notes})`);
   })
   .then(function(){
      return res.sendStatus(200);
   });
});
module.exports = router;


