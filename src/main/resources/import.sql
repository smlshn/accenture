-- ROLES
insert into authority values(1,'SUPPLIER');
insert into authority values(2,'CUSTOMER');

-- USERS
insert into user(id,email,name_surname,password) values(1,'bilalmacit@gmail.com','bial macit','asdf');
insert into user(id,email,name_surname,password) values(2,'ismailsahin@gmail.com','ismail sahin','asdf');

-- USER-ROLES
insert into user_authority(user_id,authority_id) values(1,1);
insert into user_authority(user_id,authority_id) values(2,2);
