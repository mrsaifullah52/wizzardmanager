import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Path from 'path';
const __dirname=Path.resolve();
const app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const PORT=process.env.PORT || 3333;

app.set('view engine', 'ejs');
app.set('views', "./views");
app.use(express.static(__dirname + '/public'));

app.get("/",(req, res)=>{
  res.render('main',{
    "name": "Saif",
  })
});

app.listen(PORT, ()=>{
  console.log("localhost:"+PORT);
});