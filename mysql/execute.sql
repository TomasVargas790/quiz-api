-- CREATE DATABASE quiz;
USE quiz;

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS themes;
CREATE TABLE themes(
    id int auto_increment not null,
    description varchar(150) not null,
    createdAt timestamp default now(),
    updatedAt timestamp default now(),
    primary key(id)
);
SET FOREIGN_KEY_CHECKS=1;

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS descriptions;
CREATE TABLE descriptions(
    id int auto_increment not null,
    description varchar(150) not null,
    title varchar(60) not null,
    theme int not null,
    createdAt timestamp default now(),
    updatedAt timestamp default now(),
    primary key(id),
    foreign key(theme) references themes(id)
);
SET FOREIGN_KEY_CHECKS=1;

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS questions;
CREATE TABLE questions(
    id int auto_increment not null,
    description varchar(150) not null,
    title varchar(60) not null,
    `to` int,
    answerType varchar(2) not null,
    createdAt timestamp default now(),
    updatedAt timestamp default now(),
    primary key(id),
    foreign key(`to`) references questions(id)
);
SET FOREIGN_KEY_CHECKS=1;


SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS answers;
CREATE TABLE answers(
    id int auto_increment not null,
    description varchar(150) not null,
    title varchar(60) not null,
    question int,
    `to` int,
    createdAt timestamp default now(),
    updatedAt timestamp default now(),
    primary key(id),
    foreign key(`question`) references questions(id),
    foreign key(`to`) references questions(id)
);
SET FOREIGN_KEY_CHECKS=1;

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS users;
CREATE TABLE users(
    id int auto_increment not null,
    email varchar(70) unique not null,
    password longtext not null,
    createdAt timestamp default now(),
    updatedAt timestamp default now(),
    primary key(id)
);
SET FOREIGN_KEY_CHECKS=1;
