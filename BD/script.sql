create database bancaMovil;

use bancaMovil;

create table usuarios (
	id int auto_increment primary key,
    nombre varchar(255) not null,
    apellido varchar(255) not null,
    username varchar(20) not null,
    password varchar(255) not null,
    phone varchar(20) ,
    email varchar(255) not null,
    date_create datetime default current_timestamp
);

create table cuenta(
	id int auto_increment primary key,
    usuario_id int not null,
    numero varchar(20) not null,
    saldo decimal(12,2),
    tipo varchar(1),
    fecha_apertura datetime default current_timestamp,
    foreign key(usuario_id) references usuarios(id)
);

create table movimiento (
	id int auto_increment primary key,
    cuenta_id int not null,
    monto decimal(12,2),
    descripcion varchar(255),
    fecha datetime default current_timestamp,
    foreign key(cuenta_id) references cuenta(id)
);

create table transacciones(
	id int auto_increment primary key,
    cuenta_origen int not null,
    cuenta_destino int not null,
    tipo varchar(1),
    monto decimal(12,2),
    fecha datetime default current_timestamp,
    foreign key(cuenta_origen) references cuenta(id),
    foreign key(cuenta_destino) references cuenta(id)
);