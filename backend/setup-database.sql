-- Create database for Jemimah Johnson and Associates
CREATE DATABASE IF NOT EXISTS jemimah_johnson;

-- Use the database
USE jemimah_johnson;

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    entityType ENUM('company', 'sole-proprietorship') NOT NULL,
    proposedName VARCHAR(255) NOT NULL,
    businessDescription TEXT NOT NULL,
    urgency ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
    additionalInfo TEXT,
    status ENUM('pending', 'contacted', 'in-progress', 'completed') NOT NULL DEFAULT 'pending',
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_createdAt (createdAt)
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    company VARCHAR(255),
    services JSON NOT NULL DEFAULT (JSON_ARRAY()),
    status ENUM('active', 'inactive', 'prospect') NOT NULL DEFAULT 'prospect',
    notes TEXT,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_createdAt (createdAt)
);

-- Create service_packages table
CREATE TABLE IF NOT EXISTS service_packages (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type ENUM('company', 'sole-proprietorship') NOT NULL,
    tier ENUM('basic', 'standard', 'premium') NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    currency VARCHAR(3) NOT NULL DEFAULT 'KES',
    duration VARCHAR(100) NOT NULL,
    features JSON NOT NULL DEFAULT (JSON_ARRAY()),
    inclusions JSON NOT NULL DEFAULT (JSON_ARRAY()),
    processingTime VARCHAR(100) NOT NULL,
    popular BOOLEAN DEFAULT FALSE,
    description TEXT NOT NULL,
    isActive BOOLEAN NOT NULL DEFAULT TRUE,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_tier (tier),
    INDEX idx_isActive (isActive),
    INDEX idx_createdAt (createdAt)
);

-- Insert sample data for service packages
INSERT INTO service_packages (name, type, tier, price, currency, duration, features, inclusions, processingTime, popular, description) VALUES
('Basic Company Registration', 'company', 'basic', 15000.00, 'KES', '2-3 weeks', 
 JSON_ARRAY('Name reservation', 'Company registration certificate', 'Tax PIN registration'), 
 JSON_ARRAY('Document preparation', 'Government fees', 'Basic consultation'), 
 '2-3 weeks', FALSE, 'Essential company registration service for small businesses'),

('Standard Company Registration', 'company', 'standard', 25000.00, 'KES', '1-2 weeks', 
 JSON_ARRAY('Name reservation', 'Company registration certificate', 'Tax PIN registration', 'VAT registration', 'Business permit'), 
 JSON_ARRAY('Document preparation', 'Government fees', 'Priority processing', 'Legal consultation'), 
 '1-2 weeks', TRUE, 'Complete company registration with all essential licenses'),

('Premium Company Registration', 'company', 'premium', 40000.00, 'KES', '5-7 days', 
 JSON_ARRAY('Name reservation', 'Company registration certificate', 'Tax PIN registration', 'VAT registration', 'Business permit', 'NSIF registration', 'NSSF registration', 'NHIF registration'), 
 JSON_ARRAY('Document preparation', 'All government fees', 'Expedited processing', 'Comprehensive legal support', 'Annual compliance checklist'), 
 '5-7 days', FALSE, 'All-inclusive company registration with all necessary registrations and licenses'),

('Basic Sole Proprietorship', 'sole-proprietorship', 'basic', 8000.00, 'KES', '1 week', 
 JSON_ARRAY('Business name registration', 'Tax PIN registration'), 
 JSON_ARRAY('Document preparation', 'Government fees'), 
 '1 week', FALSE, 'Basic sole proprietorship registration service'),

('Standard Sole Proprietorship', 'sole-proprietorship', 'standard', 12000.00, 'KES', '3-5 days', 
 JSON_ARRAY('Business name registration', 'Tax PIN registration', 'VAT registration', 'Single business permit'), 
 JSON_ARRAY('Document preparation', 'Government fees', 'Priority processing', 'Basic consultation'), 
 '3-5 days', TRUE, 'Complete sole proprietorship registration with essential permits'),

('Premium Sole Proprietorship', 'sole-proprietorship', 'premium', 18000.00, 'KES', '2-3 days', 
 JSON_ARRAY('Business name registration', 'Tax PIN registration', 'VAT registration', 'Single business permit', 'County permits'), 
 JSON_ARRAY('Document preparation', 'All government fees', 'Expedited processing', 'Legal consultation', 'Business advisory'), 
 '2-3 days', FALSE, 'Comprehensive sole proprietorship registration with all necessary permits');
