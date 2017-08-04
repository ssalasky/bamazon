//loading necessary packages to run program
var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "Arvada842!",
	database: "bamazon"
});
var table = require("console.table");

//establishing global variables
var userItem = 0;
var userQty = 0;

//testing connection to database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

//displaying all products available for sale
function readProducts() {
	console.log("Available products for sale: ");
	connection.query("select item_id, product_name, price from products", function(err, res) {
		if (err) throw err;

		console.table(res);
		userAction();
	});
}

function userAction() {
	inquirer.prompt([
		{
			type: "input",
			message: "What is the item_id of the product you would like to purchase?",
			name: "item"
		},
		{
			type: "input",
			message: "How many would you like to purchase?",
			name: "qty"
		}
	]).then(function(inquirerResponse) {
		userItem = parseInt(inquirerResponse.item);
		userQty = parseInt(inquirerResponse.qty);

		connection.query("select item_id, stock_quantity, price from products where ?", {item_id: userItem}, function(err, res) {
			if (err) throw err;
			
			if (userQty > res.stock_quantity) {
				console.log("Insufficient stock to complete purchase. Please try again.");
				readProducts();
				userAction();
			} else {
				console.table(res);
				var quantity = parseInt(res.stock_quantity) - userQty;
				var sales = userQty * parseInt(res.price);

				console.log(quantity);
				console.log(sales);
				// updateProduct(quantity);
			}
		});
	});
}

// function updateProduct(quantity) {
// 	connection.query("update products set ? where ?",
// 		[
// 			{
// 				stock_quantity: quantity
// 				product_sales: 
// 			},
// 			{
// 				item_id: userItem
// 			}
// 		], function(error) {
// 			if (error) throw err;
// 			console.log()
// 		}
// 	)
// }



readProducts();
