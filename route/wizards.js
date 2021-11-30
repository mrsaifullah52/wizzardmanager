import express from "express";
const wizards = express.Router();

// controller
import { editWizard, delWizard } from '../controller/wizard.js';
import { editWForm, addWForm, viewWForm, delWForm, newPage } from '../controller/wpage.js';
// middleware
import auth from '../middleware/auth.js';


wizards.get("/wedit/:wid", auth, editWizard);
wizards.get("/viewpage/:wid/:pid", auth, viewWForm);
wizards.get("/editpage/:wid/:pid", auth, editWForm);
wizards.get("/addpage/:wid", auth, newPage);

wizards.post("/addwform/:wid/:pid", auth, addWForm);

wizards.delete("/delWizard/:wid", auth, delWizard);
wizards.delete("/deletepage/:wid/:pid", auth, delWForm);

export default wizards;