import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Path from 'path';
import cookieParser from 'cookie-parser';
// routers
import routes from './route/routes.js';
import wizards from './route/wizards.js';
import wdata from './route/wdata.js';

// importing database connection
import './database/db.js';

const __dirname=Path.resolve();
const app=express();

// server configrations
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// using cookieparser package
app.use(cookieParser());
// setting server port
const PORT=process.env.PORT || 3333;
// setting view engine ejs
app.set('view engine', 'ejs');
app.set('views', "./views");
app.use(express.static(__dirname + '/public'));


// general routing
app.use("/", routes);
app.use("/wizards", wizards);
app.use("/wdata", wdata);

// running server
app.listen(PORT, ()=>{
  console.log("localhost:"+PORT);
});