import user from '../model/user.js';

export const login = async (req, res)=>{
  const {email, pass} = req.body;
  try {    
    const response = await user.find({"email":email, "password": pass});
    res.status(200).send(response);
  } catch (error) {
    res.status(401).json({message: error.message});
  }
}



export const register = async (req, res)=>{
  const {fname, lname, email, password} = req.body;
  try {
    const userdata = {
                        "fname": fname,
                        "lname": lname,
                        "email": email,
                        "password": password, 
                      };
    const response = await new user(userdata).save();
    res.status(201).send(response);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
}