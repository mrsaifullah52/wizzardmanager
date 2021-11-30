import express from "express";
import jwt from 'jsonwebtoken';
const generalroute = express.Router();

// controllers
import { wizards, addWizard, wizardSubmission, viewWizard } from '../controller/wizard.js';
import { login, logout, register, showLogin } from '../controller/user.js';
import { uploadWizard } from '../controller/wdata.js';

// importing middleware for cookie authentication
import auth from '../middleware/auth.js';

// homepage
generalroute.get("/", async (req, res) => {
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

generalroute.get("/login", showLogin);
generalroute.get("/logout", auth, logout);
generalroute.get("/register", (req, res) => {
  res.render("pages/register", ({
    error: ''
  }));
});
// wizzard submission by users
generalroute.get("/submit", wizardSubmission);
generalroute.get("/wizard", auth, wizards);
generalroute.get("/vWizard/:wid", viewWizard);


generalroute.post("/viewWizard/:wid/:uid", uploadWizard);
generalroute.post("/addwizard", auth, addWizard);
generalroute.post("/login", login);
generalroute.post("/register", register);


export default generalroute;