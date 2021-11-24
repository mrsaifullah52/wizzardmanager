import user from '../model/user.js';
import bcrypt from 'bcryptjs';

export const login = async (req, res)=>{
  const {email, pass} = req.body;
  
  try {
    const result = await user.findOne({"email":email});

    if(result){
      // comparing password
      const isMatch = await bcrypt.compare(pass, result.password);
      if(isMatch){
        res.render("pages/login",({
          error: ""
        }));
      }else{
        res.render("pages/login",({
          error: "Password is Incorrect!"
        }));
      }

    }else{
      // if we dont have any data related that email
      res.render("pages/login",({
        error: "User Does't Exist!"
      }));
    }

  } catch (error) {
    res.status(401).render("pages/login",({
      error: error.message
    }));
  }
}


export const register = async (req, res)=>{
  try {
    const {fname, lname, email, pass} = req.body;
    const userdata = {
                        "fname": fname,
                        "lname": lname,
                        "email": email,
                        "password": pass, 
                      };

    const response = await new user(userdata).save();
    if(response.email){
      res.status(201).render("pages/register",({
        classname: "alert-success",
        error: "Registered Successfuly!"
      }));
    }else{
      res.status(201).render("pages/register",({
        classname: "alert-danger",
        error: "Failed to Registered!"
      }));
    }
  } catch (error) {
    res.status(409).render("pages/register",({
      classname: "alert-danger",
      error: error.message
    }));
  }
}
