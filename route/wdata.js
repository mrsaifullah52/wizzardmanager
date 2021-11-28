import express from 'express';
const wdata = express.Router();
// middleware
import auth from '../middleware/auth.js';
// controller
import {wizards, viewWizardData} from '../controller/wdata.js';

wdata.get("/", auth, wizards);
wdata.get("/view/:wid", auth, viewWizardData)


export default wdata;