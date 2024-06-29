const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
// const bodyparser=require("body-parser")
const port = 80;
var bodyParser = require('body-parser');
const axios = require("axios")
const pug = require("pug")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var router = express.Router();



const mysql = require('mysql2');
const { IntegerType } = require("@mysql/xdevapi");
const { url } = require("inspector");
// create the connection
const con = mysql.createConnection(
  { host: 'localhost', user: 'root', database: 'gym1', password: '9545265877' }
);
con.connect();

//con.promise().query("insert into member values(109,'ak@gmail.com','ak',98764376,'Brazil','99999999')")



//display member data at vscode terminal
con.promise().query("SELECT * from member")
  .then(([rows, fields]) => {
    console.log("member data")
    console.log(rows);
  })
  .catch(console.log)
//.then( () => con.end());


//display trainer data at vscode terminal
con.promise().query("SELECT * from trainer")
  .then(([rows, fields]) => {
    console.log("Trainer data")
    console.log(rows);
  })
  .catch(console.log)
//   .then( () => con.end());





// // one entry at mysql database from member application form
// app.post('/contact', (req, res)=>{
//     var emp=req.body.mem_id;
//     var emp1=req.body.mem_name;
//     // var emp1=req.body.mem_name;
//     //var empData=[emp.mem_id,emp.mem_EmailID,emp.mem-name,emp.Mobile_no,emp.mem_Address,emp.mem_Pass]
//     con.query("insert into member1 values(?)",emp.toString(),(err,rows)=>{
//         if(err) throw err
//         console.log("1 record inserted");
//     });
//     res.send(emp);

// })


// multiple  entries at mysql database from member application form
//Get Membership entry
app.post('/member', (req, res) => {
  var emp = req.body.mem_id;
  var emp1 = req.body.mem_EmailID;
  var emp2 = req.body.mem_name;
  var emp3 = req.body.Mobile_no;
  var emp4 = req.body.mem_Address;
  var emp5 = req.body.mem_Pass;
  var sql = "insert into member values('" + emp + "','" + emp1 + "','" + emp2 + "','" + emp3 + "','" + emp4 + "','" + emp5 + "')";
  con.query(sql, (err, rows) => {
    if (err) throw err
    console.log("1 record inserted");
  });
  // res.send(emp+" Remember this id ");
  res.redirect('/pay')
})

//payment post code
app.post('/pay', (req, res) => {
  var emp = req.body.pay_id;
  var emp1 = req.body.pay_mem_id;
  var emp2 = req.body.pay_amt;
  var emp3 = req.body.pay_date;

  var sql = "insert into payment values('" + emp + "','" + emp2 + "','" + emp3 + "','" + emp1 + "')";
  con.query(sql, (err, rows) => {
    if (err) throw err
    console.log("1 record inserted");
  });
  res.send("Payment Successly Done! for member id = " + emp1);
})

//member who have payment (display in terminal)
var s = " select member.mem_id,payment.pay_id,member.mem_name,member.mem_EmailID from payment inner join member on payment.pay_mem_id=member.mem_id;"
con.promise().query(s)
  .then(([rows, fields]) => {
    console.log()
    console.log("*****************************************************************************************************************************")
    console.log("*****************************************************************************************************************************")
    console.log("Members who have payment data")
    console.log(rows);
  })
  .catch(console.log("Duplicate key error"))



// login page code
app.post('/login', (req, res) => {
  var emp = req.body.login_id;
  var emp1 = req.body.user_pass;
  var emp2 = req.body.user_name;
  var emp3 = req.body.login_role_id;
  // var sql1="select id from member2 where id=(?) ";
  var sql = "insert into login values('" + emp + "','" + emp1 + "','" + emp2 + "','" + emp3 + "')";

  con.query(sql, (err, rows) => {
    if (err) throw err
    console.log("1 record inserted");
  });
  res.send("Login Successly Done! for member id = " + emp);

})










app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {

  const params = {}
  res.status(200).render('Home.pug', params);
})

app.get('/member', (req, res) => {
  const params = {}
  res.status(200).render('member.pug', params);
})
app.get('/trainer', (req, res) => {
  const params = {}
  res.status(200).render('Trainer.pug', params);
})
app.get('/services', (req, res) => {
  const params = {}
  res.status(200).render('Services.pug', params);
})
app.get('/about', (req, res) => {
  const params = {}
  res.status(200).render('About.pug', params);
})
app.get('/Login', (req, res) => {
  const params = {}
  res.status(200).render('Login.pug', params);
})
app.get('/pay', (req, res) => {
  const params = {}
  res.status(200).render('pay.pug', params);
})



app.get('/display', (req, res) => {
  con.query('SELECT * FROM member', (err, results) => {
    if (err) throw err;
    res.status(200).render('index.pug', { data: results });
  });
});



app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});



