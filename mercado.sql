create database mercado;
use mercado;

create table Produtos(
idProduto int auto_increment primary key,
nomeProduto varchar(100) not null,
preco decimal(10,2) not null,
quantidade int not null,
total decimal(10,2) not null 
);

alter table Produtos rename column idProduto to id;
select * from Produtos;

