create database gps;
use gps;

create table tbl_gps (
id int primary key auto_increment,
lat float,
lng float,
created_at datetime
);

select * from tbl_gps;

drop database gps;