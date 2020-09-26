
-- Seeding the department table
INSERT INTO department (name)
VALUES ("Executives");

INSERT INTO department (name)
VALUES ("IT");

INSERT INTO department (name)
VALUES ("Sales");

-- Seeding the role table
INSERT INTO role (title, salary, department_id)
VALUES ("Director", 150000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Web Developer", 85000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Representative", 65000, 3);

-- Seeding the employee table
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Todd", "Howard", 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Keanu", "Reeves", 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Hiddleston", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Hubert", "Cumberdale", 3, 3);