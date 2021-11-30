import mongoose from 'mongoose';
import dotenv from 'dotenv';
// configuring .env file
dotenv.config();
  
// connecting mongodb 
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => { 
  //  console.log("Db Connected!")
  });
db.on('error', (err) => { console.log(err) });
