import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  email: {type: String, unique: true, sparse: true, required: true},
  password: {type: String, required: true},
  fname: {type: String, required: true},
  lname: {type: String, required: true},
  status: {type: String, default: "Active"},
  role: {type: String, default: "user"}
});

const user = mongoose.model('user', userSchema);

export default user;