DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR(45) NULL,
  salary DECIMAL NULL,
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(45) NULL,
  PRIMARY KEY (id)
);