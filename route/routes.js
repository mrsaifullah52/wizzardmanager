import express from "express";
import jwt from 'jsonwebtoken';
const router = express.Router();

// controllers
import { wizards, addWizard, newWizard, wizardSubmission, viewWizard } from '../controller/wizard.js';
import { login, logout, register, showLogin } from '../controller/user.js';
import { uploadWizard } from '../controller/wdata.js';

// importing middleware for cookie authentication
import auth from '../middleware/auth.js';

// homepage
router.get("/", async (req, res) => {
  try {
    // checking if user is logged in
    const login = await jwt.verify(req.cookies.jwt, process.env.SECRET_ID);
    if (login.iat) {
      res.render("index", ({
        login: "yes"
      }))
    }
  } catch (error) {
    res.render("index", ({
      login: "no"
    }))
  }
});

router.get("/login", showLogin);
router.get("/logout", auth, logout);
router.get("/register", (req, res) => {
  res.render("pages/register", ({
    error: ''
  }));
});
// wizzard submission by users
router.get("/submit", wizardSubmission);


router.get("/wizard", auth, wizards);
router.get("/createwizard", auth, newWizard);
router.get("/vWizard/:wid", viewWizard);

router.post("/viewWizard/:wid/:uid", uploadWizard);
router.post("/addwizard", auth, addWizard);
router.post("/login", login);
router.post("/register", register);



export default router;