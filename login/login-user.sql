create user 'joaoaparecido' identified by '123';
grant all privileges on . to 'joao'@'localhost';
flush privileges;

select * from mysql.user;

use login;

select * from user;