import express from "express";
import fetch from 'node-fetch';
const router = express.Router();

// controllers
import {wizards, addWizard} from '../controller/wizard.js';
import {login, register} from '../controller/user.js';


router.get("/",(req, res)=>{
  res.render("index",({
  }))
});

router.get("/wizards", wizards);
router.get("/login", (req, res)=>{
  res.render("pages/login",({
    error: ''
  }));
});
router.get("/register", (req, res)=>{
  res.render("pages/register",({
    error: ''
  }));
});

router.post("/wizards", addWizard);
router.post("/login", login);
router.post("/register", register);



router.get("/data/:title/:pages", (req, res)=>{

  // const response = await fetch(file);
  // const data = await response.text();

  const data = req.params;
  res.status(200).json(data);

});


export default router;