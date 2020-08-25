CREATE DATABASE IF NOT EXISTS `wear_todayDB`;

USE `wear_todayDB`;

DROP TABLE IF EXISTS `user_view_post`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `posts`;
DROP TABLE IF EXISTS `comments`;
DROP TABLE IF EXISTS `categorys`;

CREATE TABLE `users`(
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(120) NOT NULL UNIQUE,
    `password` VARCHAR(15) ,
    `status` VARCHAR(120),

    PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET utf8mb4;

CREATE TABLE `posts`(
    `post_id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) ,
    `date` TIMESTAMP ,
    `content` VARCHAR(120) ,

    PRIMARY KEY (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET utf8mb4;

CREATE TABLE `comments`(
    `comment_id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) ,
    `date` TIMESTAMP ,
    `content` VARCHAR(120) ,

    PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET utf8mb4;

CREATE TABLE `categorys`(
    `category_id` INT NOT NULL AUTO_INCREMENT,
    `detail` VARCHAR ,
    `shirt_detail` VARCHAR(120) ,
    `pants_detail` VARCHAR(120) ,
    `hat_detail` VARCHAR(120) ,
    `accessories_detail` VARCHAR(120) ,

    PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET utf8mb4;

CREATE TABLE `user_view_post`(
    `user_id` INT AUTO_INCREMENT,
    `name` VARCHAR(120) ,
    `date` TIMESTAMP ,
    `content` VARCHAR(120) ,

    PRIMARY KEY (`user_id`)
    CONSTRAINT `users_ibfk_1` FOREIGN KEY `user_id` REFERENCES `user_view_post`.`user_id`,
    CONSTRAINT `users_ibfk_2` FOREIGN KEY `user_id` REFERENCES `posts`.`user_id`
) ENGINE=InnoDB DEFAULT CHARSET utf8mb4;
