import jwt from 'jsonwebtoken';
import user from '../model/user.js';

const auth = async (req, res, next) => {
  try {
    // getting token from browser
    const token = req.cookies.jwt;
    // checking its validation
    const verification = await jwt.verify(token, process.env.SECRET_ID);
    // getting from database
    const userdata = await user.findOne({ _id: verification._id });

    req.token = token;
    req.user = userdata;

    // sending control back
    next();
  } catch (error) {
    return res.status(401).redirect("/login")
  }
}

export default auth;