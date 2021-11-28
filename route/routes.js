import express from "express";
import fetch from 'node-fetch';
const router = express.Router();

// controllers
import {wizards, addWizard, newWizard, wizardSubmission, viewWizard} from '../controller/wizard.js';
import {login, logout, register, showLogin} from '../controller/user.js';
import {uploadWizard} from '../controller/wdata.js';

// importing middleware for cookie authentication
import auth from '../middleware/auth.js';

router.get("/",(req, res)=>{
  res.render("index",({
  }))
});

router.get("/login", showLogin);
router.get("/logout", auth, logout);
router.get("/register", (req, res)=>{
  res.render("pages/register",({
    error: ''
  }));
});
// form submission by users
router.get("/submit", wizardSubmission);


router.get("/wizard", auth, wizards);
router.get("/createwizard", auth, newWizard);
router.get("/vWizard/:wid", viewWizard);

router.post("/viewWizard/:wid/:uid", uploadWizard);
router.post("/addwizard",auth, addWizard);
router.post("/login", login);
router.post("/register", register);



export default router;