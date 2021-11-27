import express from "express";
const router = express.Router();


// controller
import {editWizard, editWForm, addWForm, viewWForm, delWizard, delWForm, newPage} from '../controller/wizard.js';
// middleware
import auth from '../middleware/auth.js';


router.get("/wedit/:wid", auth, editWizard);
router.get("/viewpage/:wid/:pid", auth, viewWForm);
router.get("/editpage/:wid/:pid", auth, editWForm);
// insert new form page
router.get("/addpage/:wid", auth, newPage);

router.post("/addwform/:wid/:pid", auth, addWForm);

router.delete("/delWizard/:wid",auth, delWizard);
router.delete("/deletepage/:wid/:pid",auth, delWForm);

export default router;