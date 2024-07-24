//--- db connection: ---
const express=require('express');
const app = express();

const mongoose=require('mongoose');
const dotenv=require('dotenv');
const helmet=require('helmet');
const morgan=require('morgan');

const cors=require('cors');
const bodyparser = require('body-parser');
const path =require('path');

const port=8800;

const route = require('./route.js');

app.use(express.json());

dotenv.config();

app.use('/api', route);

app.use(cors());

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

'use strict';

const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}
//console.log("IP:\t"+results["enp3s0"][0]);

app.get('/gallery',(req,res)=>{
	var fs = require('fs');
	var files = fs.readdirSync('./src/assets/shootingRange/');
	res.send(JSON.stringify(files));
});

app.get('/ip',(req,res)=>{
	res.send(results["enp3s0"][0]);
});

app.listen(port,()=>{
	console.log("Port:\t"+port)
	console.log("Link:\tlocalhost:8000")
});



//--- email part: ---

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSOWORD
  }
});

function email(firstname, lastname, email, subject, body){
	var mailOptions = {
	  from: process.env.GMAIL_USER,
	  to: process.env.GMAIL_USER,
	  subject: subject,
	  text: "Firstname: "+firstname+"\nLastname: "+lastname+"Email: "+email+"\n\n"+body
	};
	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});
}
var timer=0;
if(timer<1){
	var fs = require('fs');
	var files = fs.readdirSync('./src/assets/shootingRange/');
	//console.log(JSON.stringify(files));
	timer++;
}