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

function action() {
	inquirer.prompt([
		{
			type: "list",
			message: "What would you like to do?",
			choices: ["View_Product_Sales", "Add_Department"],
			name: "action"
		}
	]).then(function(answer) {
		switch(answer.action) {
			case "View_Product_Sales":
				viewSales();
				break;
			case "Add_Department":
				addDepartment();
				break;
		}
	});
}

function viewSales() {
	connection.query("select departments.department_name, departments.over_head_costs, sum(products.product_sales), sum(products.product_sales - departments.over_head_costs) as total_profit from departments join products on departments.department_name = products.department_name group by 1, 2",
	 function(err, res) {
		if (err) throw err;
		console.table(res);
		nextAction();
	});
}

function addDepartment() {
	inquirer.prompt([
		{
			type: "input",
			message: "What is the name of the new department?",
			name: "name"
		},
		{
			type: "input",
			message: "What are the over head costs for this new department?",
			name: "costs"
		}
	]).then(function(answer) {
		var overhead = parseInt(answer.costs);

		connection.query("insert into departments set ?",
			{
				department_name: answer.name,
				over_head_costs: overhead
			},
			function(err, res) {
				if (err) throw err;
				console.log("Table updated.");
				console.table(res);
				nextAction();
			}
		)
	})
}

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