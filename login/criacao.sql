create database login;

use login;

create table user(
iduser int primary key,
username varchar(20) not null,
password varchar (8) not null);

insert into user values (1, 'joaoaparecido', 'joao123');

SELECT * FROM user;
