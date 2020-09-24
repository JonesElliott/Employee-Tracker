DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
  id INT NOT NULL UNIQUE AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL UNIQUE AUTO_INCREMENT,
  title VARCHAR(45) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL UNIQUE AUTO_INCREMENT,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Developers");

INSERT INTO department (name)
VALUES ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesman", 75000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Web Developer", 85000, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Todd", "Howard", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ryan", "Styles", 2, 1);