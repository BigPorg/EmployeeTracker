USE employees_db;

INSERT INTO department
VALUES
('Sales'),
('R&D'),
('IT'),
('HR'),
('Management'),
('Shop floor');

INSERT INTO employee (first, last, role, managerID)
VALUES
('Albert', 'Zed', 'Sales', 101),
('Bobby', 'Yarrow', 'R&D', 202),
('Charles', 'Xenos', 'IT', 303),
('Danny', 'Warpspace', 'HR', 405),
('Eddy', 'Verback', 'Management', 505),
('Francis', 'Underwood', 'Shop floor', 606);

INSERT INTO role (job, salary, departmentNumber)
VALUES
('Merchant', 60000, 1),
('Engineer', 60000, 2),
('Web Developer', 60000, 3),
('HR Head', 60000, 4),
('Manager', 60000, 5),
('Workshopper', 60000, 6);