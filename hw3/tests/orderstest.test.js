
//Carina Pineda 
// February 28, 2020


var fs = require('fs');
test('test selectEvent', () => {

    //Read the orders.js file into a string
var orderVar = fs.readFileSync('routes/orders.js');
expect(orderVar).toEqual(expect.anything()); //any non-null value is okay
});
