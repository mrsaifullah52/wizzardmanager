import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// user document in mongodb
const userSchema = mongoose.Schema({
  email: {type: String, unique: true, sparse: true, required: true},
  password: {type: String, required: true},
  fname: {type: String, required: true},
  lname: {type: String, required: true},
  status: {type: String, default: "Active"},
  role: {type: String, default: "user"},
  tokens:[
    {
      token:{
        type: String,
        required: true
      },
    }
  ]
});

// using middleware for password hashing with bcrypt
userSchema.pre("save", async function(next){
  if(this.isModified("password")){
    this.password= await bcrypt.hash(this.password, 10);
  }
  next();
});

// jsonwebtoken middleware function
userSchema.methods.getToken = async function (){
  const mytoken = jwt.sign({_id: this._id}, process.env.SECRET_ID);
  this.tokens = this.tokens.concat({token: mytoken});
  await this.save();
  return mytoken;
}

// creating model
const user = mongoose.model('user', userSchema);

export default user;