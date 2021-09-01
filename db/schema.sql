DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employee (
    id NOT NULL auto_increment,
    first VARCHAR(200) NOT NULL,
    last VARCHAR(200) NOT NULL,
    role VARCHAR(200) NOT NULL,
    manager_id INT NOT NULL,
    primary key (id)
);

CREATE TABLE department (
    id NOT NULL auto_increment,
    name VARCHAR(200) NOT NULL,
    primary key (id)
);

CREATE TABLE role (
    id NOT NULL auto_increment,
    title VARCHAR(200) NOT NULL,
    salary decimal (10,2) NOT NULL,
    primary key (id),
);