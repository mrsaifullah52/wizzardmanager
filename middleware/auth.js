import jwt from 'jsonwebtoken';
import user from '../model/user.js';

const auth = async (req, res, next)=>{
  try {
    const token = req.cookies.jwt;
    // getting token from browser
    const verification = await jwt.verify(token, process.env.SECRET_ID);
    // getting from database
    const userdata = await user.findOne({_id:verification._id});
    
    req.token = token;
    req.user = userdata;

    next();
  } catch (error) {
    res.status(401).render("pages/login",({
      error: 'Please Authenticate Yourself First'
    })); 
  }
}

export default auth;