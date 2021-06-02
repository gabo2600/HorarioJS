DROP DATABASE horario;
CREATE DATABASE  if not exists horario;
USE horario;

CREATE TABLE if not exists clase(
    idClase int not null auto_increment,
    clase varchar(30) not null,
    prof varchar(30) not null,
    pat varchar(30) not null,
    mat varchar(30) not null,
    url varchar(512) not null,
    primary key(IdClase)
);

CREATE TABLE if not exists horario(
    IdHorario int not null auto_increment,
    hi int not null,
    hf int not null,
    idClase int not null,
    idDia int not null,
    primary key(IdHorario)
);

CREATE TABLE if not exists dia(
    IdDia int not null auto_increment,
    dia varchar(10) not null,
    primary key(IdDia)
);

INSERT INTO dia values(NULL,"Lunes");
INSERT INTO dia values(NULL,"Martes");
INSERT INTO dia values(NULL,"Miercoles");
INSERT INTO dia values(NULL,"Jueves");
INSERT INTO dia values(NULL,"Viernes");
INSERT INTO dia values(NULL,"Sabado");
INSERT INTO dia values(NULL,"Domingo");