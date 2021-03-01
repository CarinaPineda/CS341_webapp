/* Carina Pineda 
Feb 28 2020 */

var express = require('express');
var router = express.Router();
/*
Needed to make array in Javascript
External Citation:
https://medium.com/@sandhya.sadanandan/javascript-how-to-construct-an-array-of-json-objects-using-map-d1a513727008
*/
var data = [{
    topping: "cherry",
    quantity: 2
  },
  {
    topping: "plain",
    quantity: 6
  },
  {
    topping: "chocolate",
    quantity: 3
  }
];


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(data);
 
});

/*POST users listing. */
router.post('/', function(req, res, next) {
  res.send(data);

});

module.exports = router;

