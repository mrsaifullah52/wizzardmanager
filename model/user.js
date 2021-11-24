import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  email: {type: String, unique: true, sparse: true, required: true},
  password: {type: String, required: true},
  fname: {type: String, required: true},
  lname: {type: String, required: true},
  status: {type: String, default: "Active"},
  role: {type: String, default: "user"}
});

// using middleware for password hashing with bcrypt
userSchema.pre("save", async function(next){
  if(this.isModified("password")){
    this.password= await bcrypt.hash(this.password, 10);
  }
  next();
});
const user = mongoose.model('user', userSchema);


export default user;