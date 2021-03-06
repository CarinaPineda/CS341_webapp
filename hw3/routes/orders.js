/* Carina Pineda 
March 8 2021*/

var express = require('express');
var router = express.Router();
var dbms = require('./dbms_promise');
/*
Needed to make array in Javascript
External Citation:
https://medium.com/@sandhya.sadanandan/javascript-how-to-construct-an-array-of-json-objects-using-map-d1a513727008
*/

 var data = [
   {
      "topping": "plain", 
      "quantity": 0
   },
   {
      "topping": "cherry", 
      "quantity": 0
   },
   {
      "topping": "chocolate", 
      "quantity": 0
   }
 ];

/* POST users listing. */
router.use(express.json());
router.post('/', function(req, res, next) {
  var month = req.body.month; //dbms.dbquery.month; 
 console.log("month: " + month);

 //https://docs.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbquery-1?view=efcore-3.1
 //http://www.java2s.com/Tutorials/Javascript/Node.js_Tutorial/0100__Node.js_Functions.htm

   dbms.dbquery("SELECT SUM(QUANTITY) FROM ORDERS WHERE MONTH='"+ month + "' AND TOPPING='plain'").then(function(database){   
      var quantity = database[0]["SUM(QUANTITY)"]
      if (!quantity){
         quantity = 0;
      }
      data[0]["quantity"] = quantity;

   }).then(function(){
      return dbms.dbquery("SELECT SUM(QUANTITY) FROM ORDERS WHERE TOPPING='cherry' AND MONTH='"+ month+ "';");
   }).then(function(database){
      var quantity = database[0]["SUM(QUANTITY)"]
      if (!quantity){
         quantity = 0;
      }
      data[1]["quantity"] = quantity;
      
   }).then(function(){
      return dbms.dbquery("SELECT SUM(QUANTITY) FROM ORDERS WHERE TOPPING='chocolate' AND MONTH='"+ month+ "';");
   }).then(function(database){
      var quantity = database[0]["SUM(QUANTITY)"]
      if (!quantity){
         quantity = 0;
      }
      data[2]["quantity"] = quantity;
   }).then(function(){
      console.log(data);
      res.json(data);
   });
});
module.exports = router;

