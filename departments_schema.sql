use bamazon;

create table departments(
	department_id integer(4) auto_increment not null,
    department_name varchar(100) not null,
    over_head_costs integer(5) not null,
    primary key(department_id)
);

insert into departments(department_name, over_head_costs)
values ("Accessories", 1000), ("Clothing", 1500), ("Kitchen", 2000), ("Sporting Goods", 1600);

select * from departments;