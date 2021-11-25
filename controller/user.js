import user from '../model/user.js';
import bcrypt from 'bcryptjs';

export const login = async (req, res)=>{
  const {email, pass, remember} = req.body;
  
  try {
    const result = await user.findOne({"email":email});

    if(result){
      // comparing password
      const isMatch = await bcrypt.compare(pass, result.password);
      if(isMatch){
        // setting cookie
        const token = await result.getToken();
        var hour = 3600000; 
        if(remember){
          res.cookie("jwt", token,{
            httpOnly: true,
            // till 7 days
            maxAge: 7 * 24 * hour
          }).render("index");
        }else{
            // until browser close
          res.cookie("jwt", token,{
            httpOnly: true,
          }).render("index");
        }
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

      // generating token
      const token = await response.getToken();

      res.cookie("jwt", token,{
        httpOnly: true
      })
      .status(201).render("pages/register",({
        classname: "alert-success",
        error: "Registered Successfuly!",
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

export const showLogin = (req, res)=>{
  const jwt=req.cookies.jwt;
  if(jwt){
    return res.redirect("/");
  }else{
    res.render("pages/login",({
      error: ''
    }));
  }
}

export const logout = async (req,res)=>{
  try {
    // removing jwt token from database
    req.user.tokens = req.user.tokens.filter((currElem)=>{
      return currElem.token !== req.token;
    });
    // removing jwt token from browser 
    res.clearCookie("jwt");
    await req.user.save();
    res.render("pages/login",({
      error: ''
    }));
  } catch (error) {
    res.status(500).send(error.message);
  }
}