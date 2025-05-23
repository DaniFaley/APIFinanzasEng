CREATE DATABASE IF NOT EXISTS proyecto_finanzas;
USE proyecto_finanzas;

-- Table: User
CREATE TABLE user (
  id_user INT PRIMARY KEY AUTO_INCREMENT,
  nameUser VARCHAR(30) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
-- Table: Bank Account
CREATE TABLE bank_account (
  id_bankAccount INT PRIMARY KEY AUTO_INCREMENT,
  name_bankAccount VARCHAR(30) NOT NULL,
  fk_id_user INT NOT NULL,
  FOREIGN KEY (fk_id_user) REFERENCES user(id_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Income
-- Table: Income Category
CREATE TABLE income_category (
  id_incomeCategory INT PRIMARY KEY AUTO_INCREMENT,
  name_incomeCategory VARCHAR(30) NOT NULL,
  fk_id_user INT NOT NULL,
  FOREIGN KEY (fk_id_user) REFERENCES user(id_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Table: Income
CREATE TABLE income (
  id_income INT PRIMARY KEY AUTO_INCREMENT,
  commentary VARCHAR(50),
  amount DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  fk_id_user INT NOT NULL,
  fk_id_bankAccount INT NOT NULL,
  fk_id_incomeCategory INT NOT NULL,
  FOREIGN KEY (fk_id_user) REFERENCES user(id_user),
  FOREIGN KEY (fk_id_bankAccount) REFERENCES bank_account(id_bankAccount),
  FOREIGN KEY (fk_id_incomeCategory) REFERENCES income_category(id_incomeCategory)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Expense
-- Table: Expense Category
CREATE TABLE expense_category (
  id_expenseCategory INT PRIMARY KEY AUTO_INCREMENT,
  name_expenseCategory VARCHAR(30) NOT NULL,
  fk_id_user INT NOT NULL,
  FOREIGN KEY (fk_id_user) REFERENCES user(id_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Table: Expense Type
CREATE TABLE expense_type (
  id_expenseType INT PRIMARY KEY AUTO_INCREMENT,
  name_expenseType VARCHAR(30) NOT NULL,
  fk_id_user INT NOT NULL,
  FOREIGN KEY (fk_id_user) REFERENCES user(id_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Table: Expense Store
CREATE TABLE expense_store (
  id_expenseStore INT PRIMARY KEY AUTO_INCREMENT,
  name_store VARCHAR(30) NOT NULL,
  fk_id_user INT NOT NULL,
  FOREIGN KEY (fk_id_user) REFERENCES user(id_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Table: Expense
CREATE TABLE expense (
  id_expense INT PRIMARY KEY AUTO_INCREMENT,
  commentary VARCHAR(50),
  amount DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  fk_id_user INT NOT NULL,
  fk_id_bankAccount INT NOT NULL,
  fk_id_expenseCategory INT NOT NULL,
  fk_id_expenseType INT NOT NULL,
  fk_id_expenseStore INT NOT NULL,
  FOREIGN KEY (fk_id_user) REFERENCES user(id_user),
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
  date DATE NOT NULL,
  fk_id_user INT NOT NULL,
  fk_id_bankAccount_incoming  INT NOT NULL,
  fk_id_bankAccount_exit  INT NOT NULL,
  FOREIGN KEY (fk_id_user) REFERENCES user(id_user),
  FOREIGN KEY (fk_id_bankAccount_incoming) REFERENCES bank_account(id_bankAccount),
  FOREIGN KEY (fk_id_bankAccount_exit) REFERENCES bank_account(id_bankAccount)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;