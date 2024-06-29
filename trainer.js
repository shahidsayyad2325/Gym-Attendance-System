const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
// const bodyparser=require("body-parser")
const port = 80;
var bodyParser = require('body-parser');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));




const mysql = require('mysql2');
const { IntegerType } = require("@mysql/xdevapi");
// create the connection
const con = mysql.createConnection(
  {host:'localhost', user: 'root', database: 'db1',password:'9545265877'}
);

//con.promise().query("insert into member values(109,'ak@gmail.com','ak',98764376,'Brazil','99999999')")
con.query("SELECT * from trainer",(err,results)=>{
    if (err){
        console.log(err);
        return;

    }
    console.log("Result",results)

    
});
//   .then( ([rows,fields]) => {
//     console.log(rows);
//   })
//   .catch(console.log)
//   .then( () => con.end());


// const contact = mysql.createPool({
//  id:Number,
//  name:String,
//  email:String,
//  phone:Number,
//  address:String,
//  password:Number



// }
// )
//con.connect();