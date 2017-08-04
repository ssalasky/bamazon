//loading necessary packages to run program
var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon"
});
var table = require("console.table");

function action() {
	inquirer.prompt([
		{
			type: "list",
			message: "What would you like to do?",
			choices: ["View_Products", "View_Low_Inventory", "Add_Inventory", "Add_Product"],
			name: "action"
		}
	]).then(function(answer) {
		switch(answer.action) {
			case "View_Products":
				viewProducts();
				break;
			case "View_Low_Inventory":
				lowInventory();
				break;
			case "Add_Inventory":
				addInventory();
				break;
			case "Add_Product":
				addProduct();
				break;
		}
	});
}

function viewProducts() {
	connection.query("select item_id, product_name, stock_quantity from products", function(err, res) {
		if (err) throw err;
		console.table(res);	
		nextAction();
	});
}

function lowInventory() {
	connection.query("select * from products where stock_quantity < 5", function(err, res) {
		if (err) throw err;
		console.table(res);
		console.log("Low inventory items will appear above, if no items show then everything is stocked.");
		nextAction();
	});
}

function addInventory() {
	connection.query("select item_id, product_name, stock_quantity from products", function(err, res) {
		if (err) throw err;
		console.table(res);

		inquirer.prompt([
			{
				type: "input",
				message: "Which item_id would you like to add inventory too?",
				name: "item"	
			},
			{
				type: "input",
				message: "What is the new total inventory?",
				name: "quantity"
			}
		]).then(function(answer) {
			var quantity = parseInt(answer.quantity);
			var id = parseInt(answer.item);

			var query = connection.query("update products set ? where ?",
				[
					{
						stock_quantity: quantity
					},
					{
						item_id: id
					}
				], function(error) {
					if (err) throw err;
					console.log("Inventory has been updated successfully.");
					nextAction();
				}
			);

			console.log(query.sql);
		});
	});
}

function addProduct() {
	inquirer.prompt([
		{
			type: "input",
			message: "What is the name of the new product?",
			name: "name"
		}, 
		{
			type: "input",
			message: "What department is this product under?",
			name: "department"
		},
		{
			type: "input",
			message: "What is the price of the product?",
			name: "price"
		},
		{
			type: "input",
			message: "How many of units of the new item do you have?",
			name: "stock"
		}
	]).then(function(answer) {
		var qty = parseInt(answer.stock);
		var price = parseInt(answer.price);

		connection.query("insert into products set ?",
			{
				product_name: answer.name,
				department_name: answer.department,
				price: price,
				stock_quantity: qty
			}, function(err) {
				if (err) throw err;
				console.log("New product added to inventory.");
				nextAction();
			}
		);
	});
};

function nextAction() {
	inquirer.prompt([
		{
			type: "list",
			message: "Would you like to do something else?",
			choices: ["Yes", "No"],
			name: "next"
		}
	]).then(function(answer) {
		if(answer.next.toLowerCase() === "yes") {
			action();
		} else {
			console.log("Have a nice day.");
			connection.end();
		};
	});
};

action();