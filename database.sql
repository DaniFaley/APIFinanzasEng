CREATE DATABASE IF NOT EXISTS proyecto_finanzas;
USE proyecto_finanzas;

-- Table: Bank Account
CREATE TABLE bank_account (
  id_bankAccount INT PRIMARY KEY AUTO_INCREMENT,
  name_bankAccount VARCHAR(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Income
-- Table: Income Category
CREATE TABLE income_category (
  id_incomeCategory INT PRIMARY KEY AUTO_INCREMENT,
  name_incomeCategory VARCHAR(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Table: Income
CREATE TABLE income (
  id_income INT PRIMARY KEY AUTO_INCREMENT,
  commentary VARCHAR(50),
  amount DECIMAL(10,2) NOT NULL,
  date VARCHAR(10) NOT NULL,
  fk_id_bankAccount INT NOT NULL,
  fk_id_incomeCategory INT NOT NULL,
  FOREIGN KEY (fk_id_bankAccount) REFERENCES bank_account(id_bankAccount),
  FOREIGN KEY (fk_id_incomeCategory) REFERENCES income_category(id_incomeCategory)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Expense
-- Table: Expense Category
CREATE TABLE expense_category (
  id_expenseCategory INT PRIMARY KEY AUTO_INCREMENT,
  name_expenseCategory VARCHAR(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Table: Expense Type
CREATE TABLE expense_type (
  id_expenseType INT PRIMARY KEY AUTO_INCREMENT,
  name_expenseType VARCHAR(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Table: Expense Store
CREATE TABLE expense_store (
  id_expenseStore INT PRIMARY KEY AUTO_INCREMENT,
  name_store VARCHAR(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Table: Expense
CREATE TABLE expense (
  id_expense INT PRIMARY KEY AUTO_INCREMENT,
  commentary VARCHAR(50),
  amount DECIMAL(10,2) NOT NULL,
  date VARCHAR(10) NOT NULL,
  fk_id_bankAccount INT NOT NULL,
  fk_id_expenseCategory INT NOT NULL,
  fk_id_expenseType INT NOT NULL,
  fk_id_expenseStore INT NOT NULL,
  FOREIGN KEY (fk_id_bankAccount) REFERENCES bank_account(id_bankAccount),
  FOREIGN KEY (fk_id_expenseCategory) REFERENCES expense_category(id_expenseCategory),
  FOREIGN KEY (fk_id_expenseType) REFERENCES expense_type(id_expenseType),
  FOREIGN KEY (fk_id_expenseStore) REFERENCES expense_store(id_expenseStore)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Table: Transaction
CREATE TABLE transaction_bank_account (
  id_transaction_bank_account INT PRIMARY KEY AUTO_INCREMENT,
  commentary VARCHAR(50),
  amount DECIMAL(10,2) NOT NULL,
  date VARCHAR(10) NOT NULL,
  fk_id_bankAccount_incoming  INT NOT NULL,
  fk_id_bankAccount_exit  INT NOT NULL,
  FOREIGN KEY (fk_id_bankAccount_incoming) REFERENCES bank_account(id_bankAccount),
  FOREIGN KEY (fk_id_bankAccount_exit) REFERENCES bank_account(id_bankAccount)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--Insercciones

-- Insertar en bank_account
INSERT INTO bank_account (name_bankAccount) VALUES 
('BBVA'),
('Banamex'),
('MercadoPago');

-- Insertar en income_category
INSERT INTO income_category (name_incomeCategory) VALUES 
('Salario'),
('Freelance'),
('Inversiones');

-- Insertar en income
INSERT INTO income (commentary, amount, date, fk_id_bankAccount, fk_id_incomeCategory) VALUES 
('Pago quincenal', 15000.00, '2024-06-01', 1, 1),
('Proyecto freelance', 8000.00, '2024-06-05', 3, 2),
('Intereses bonos', 1200.50, '2024-06-10', 2, 3);

-- Insertar en expense_category
INSERT INTO expense_category (name_expenseCategory) VALUES 
('Alimentos'),
('Transporte'),
('Servicios');

-- Insertar en expense_type
INSERT INTO expense_type (name_expenseType) VALUES 
('Fijo'),
('Variable');

-- Insertar en expense_store
INSERT INTO expense_store (name_store) VALUES 
('OXXO'),
('Chedraui'),
('Gasolinera');

-- Insertar en expense
INSERT INTO expense (commentary, amount, date, fk_id_bankAccount, fk_id_expenseCategory, fk_id_expenseType, fk_id_expenseStore) VALUES 
('Compra semanal', 1200.00, '2024-06-03', 1, 1, 2, 2),
('Gasolina auto', 950.50, '2024-06-06', 2, 2, 2, 3),
('Pago luz', 400.00, '2024-06-07', 3, 3, 1, 1);

-- Insertar en transaction_bank_account
INSERT INTO transaction_bank_account (commentary, amount, date, fk_id_bankAccount_incoming, fk_id_bankAccount_exit) VALUES 
('Transferencia ahorro', 5000.00, '2024-06-08', 2, 1),
('Pago tarjeta', 3000.00, '2024-06-09', 1, 3);