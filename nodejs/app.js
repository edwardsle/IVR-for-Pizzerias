const express = require('express');
const mysql = require('mysql')

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cs597'
})

function storeOrder(phoneNumber, data) {
  const status = 'prepare';
	const source = 'online';
	const ispaid = 'null';
  const orderID = 0;
  const  createOrder = db.query("INSERT INTO orders (status, source, phone, ispaid) VALUES ($1,$2,$3,$4)",[status,source,phoneNumber,ispaid], function(err,result){
    if(err) throw err;
    orderID = result.insertId;
  });

  const size = '';
	const crust = '';
	const sauce = '';
	const toppings = '';
  for (var pizza in data) {
    size = pizza['size'];
    crust = pizza['crust'];
    sauce = pizza['sauce'];
    for (var topping in data['toppings']){
      toppings =+ topping + " ";
    }
  }
  const  mySql = db.query("INSERT INTO pizzas (orderid,status,crust,size,sauce,toppings) VALUES ($1,$2,$3,$4)",[orderID,status,crust,size,sauce,toppings],function(err,result){
    if(err) throw err;
  });

}




db.connect((error) => {
  if(error) {
    console.error("error", error);
  }
  console.log("Mysql connected");
});