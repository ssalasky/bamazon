create database bamazon;

use bamazon;

create table products (
	item_id integer(5) auto_increment not null,
    product_name varchar(100) not null,
    department_name varchar(100) not null,
    price integer(4) not null,
    stock_quantity integer(4) not null,
    product_sales integer(8) default 0,
    sold_quantity integer(4) default 0,
    primary key(item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
values ("Hat Pin", "Accesories", 10, 100), ("T Shirt", "Clothing", 25, 30), ("Water Bottle", "Kitchen", 11, 20), ("Watch", "Accessories", 45, 12), ("Hoodie", "Clothing", 30, 15);

insert into products(product_name, department_name, price, stock_quantity)
values ("Mixer", "Kitchen", 150, 8), ("Soccer Ball", "Sporting Goods", 15, 11), ("Tennis Racket", "Sporting Goods", 25, 20), ("Hat", "Clothing", 28, 50), ("Pearl Necklace", "Accessories", 125, 5);

select * from products;