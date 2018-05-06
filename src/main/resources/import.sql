-- ROLES
insert into authority values(1,'SUPPLIER');
insert into authority values(2,'CUSTOMER');

-- USERS
insert into user(id,email,name_surname,password) values(1,'bilalmacit@gmail.com','bial macit','asdf');
insert into user(id,email,name_surname,password) values(2,'ismailsahin@gmail.com','ismail sahin','asdf');

-- USER-ROLES
insert into user_authority(user_id,authority_id) values(1,1);
insert into user_authority(user_id,authority_id) values(2,2);

insert into product(id,name,image) values(1,'t-shirt',null);
insert into product(id,name,image) values(2,'t-shirt-2',null);
insert into product(id,name,image) values(3,'t-shirt-3',null);
insert into product(id,name,image) values(4,'t-shirt-4',null);
insert into product(id,name,image) values(5,'t-shirt-5',null);
insert into product(id,name,image) values(6,'t-shirt-6',null);