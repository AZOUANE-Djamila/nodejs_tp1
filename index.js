//#region  REQUIRE
var express = require("express")
//var express =require("body-parser")
const mysql = require('mysql2');
const knex = require('knex')({
      client: 'mysql2',
      connection: {
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '',
    database : 'classicmodels'
  }
});

//#endregion
const employe = require('./employe')(app,mysql)
const employe2 = require('./employe2')(app,knex)

//#region CONFIGURATION


app.listen(8080, function(){  console.log(`Serveur port 8080`)})