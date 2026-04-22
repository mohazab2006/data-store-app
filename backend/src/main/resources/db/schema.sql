-- Phase 2: create the users table in data_store_db.
-- Run this once in MySQL Workbench or CLI while connected to data_store_db:
--   mysql -u root -p data_store_db < src/main/resources/db/schema.sql
-- Or paste the CREATE TABLE below into a SQL tab.

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    age INT NOT NULL
);
