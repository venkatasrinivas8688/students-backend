create database if not exists students;
create table if not exists student_details(
	id int primary key auto_increment,
    name varchar(50),
    email varchar(50),
    age int,
    gender varchar(10)
);
