/* Create schema*/
CREATE DATABASE IF NOT EXISTS `test_db`;

USE `test_db`;
DROP TABLE IF EXISTS `audit_data`;
CREATE TABLE IF NOT EXISTS `audit_data` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `Day` INT UNSIGNED NOT NULL,
    `Month` INT UNSIGNED NOT NULL,
    `Year` INT UNSIGNED NOT NULL,
    `Hour` INT UNSIGNED NOT NULL,
    `Minute` INT UNSIGNED NOT NULL,
    `Second` INT UNSIGNED NOT NULL,
    `Temperature` FLOAT UNSIGNED default 0,
    `Pressure` FLOAT UNSIGNED default 0,
    `Flow` FLOAT UNSIGNED default 0,
    `Total` FLOAT UNSIGNED default 0,
    `Valve_1` TINYINT NOT NULL,
    `Valve_2` TINYINT NOT NULL,
    `Valve_3` TINYINT NOT NULL,
    `Valve_4` TINYINT NOT NULL,
    `Valve_5` TINYINT NOT NULL,
    `M_1` TINYINT NOT NULL,
    `M_2` TINYINT NOT NULL,
    `M_3` TINYINT NOT NULL,
    `kw1` FLOAT UNSIGNED default 0,
    `kw2` FLOAT UNSIGNED default 0,
    `kw3` FLOAT UNSIGNED default 0,
    `kwh` FLOAT UNSIGNED default 0,
    PRIMARY KEY (`id`)
);
