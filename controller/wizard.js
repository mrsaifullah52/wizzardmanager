// models
import wizard from '../model/wizards.js';

export const wizards = (req, res)=>{

  const jwt = req.cookies.jwt;
 
  if(jwt){
    res.render("pages/wizards",({
    }))
  }else{
    res.render("pages/login",({
      error: "Please Login First"
    }))
  }

}

export const addWizard = (req, res)=>{
  res.render("pages/wizards",({
  }))
}