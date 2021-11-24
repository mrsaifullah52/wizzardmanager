import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Path from 'path';
import routes from './route/routes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const __dirname=Path.resolve();
const app=express();

// server configrations
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const PORT=process.env.PORT || 3333;
app.set('view engine', 'ejs');
app.set('views', "./views");
app.use(express.static(__dirname + '/public'));
dotenv.config();

// general routes
app.use("/", routes);
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });




// connecting mongodb
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db=mongoose.connection;
db.once('open',()=>{console.log("Db Connected!")});
db.on('error',(err)=>{console.log(err)});





// running server
app.listen(PORT, ()=>{
  console.log("localhost:"+PORT);
});