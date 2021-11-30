import express from 'express';
const wdata = express.Router();

// controller
import { wizards, viewWizardData, delWizardData } from '../controller/wdata.js';
// middleware
import auth from '../middleware/auth.js';

wdata.get("/", auth, wizards);
wdata.get("/view/:wid", auth, viewWizardData)
wdata.get("/del/:wid/:uid", auth, delWizardData)

export default wdata;