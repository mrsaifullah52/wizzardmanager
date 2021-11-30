// models
import wizard from '../model/wizards.js';
import wForm from '../model/wForm.js';
import wData from '../model/wData.js';

// jsonwebtoken to verify login token
import jwt from 'jsonwebtoken';

// display all created wizard forms
export const wizards = async (req, res) => {
  try {
    const uid = req.user._id;
    const role = req.user.role;
    let response;
    if(role=="user"){
      response= await wizard.find({ uid })
    }else{
      response= await wizard.find();
    }

    res.render("pages/wizards", ({
      uid: uid.toString(),
      wizard: response,
      error: '',
      classname: ''
    }));
  } catch (error) {
    res.render("pages/wizards", ({
      error: error.message,
      classname: "alert-danger"
    }));
  }
}

// create new wizzard form
export const addWizard = async (req, res) => {
  try {
    let uid = req.user._id.toString();
    let wizardLink;
    const { title, page } = req.body;
    let pages = [];
    let position = 1;

    // checking existing wizzard's count  
    const wizards = await wizard.countDocuments({ uid });

    // generating links for form
    if (wizards > 0) {
      position = wizards + 1;
      wizardLink = uid.substr(0, uid.length - 5) + "_" + position;
      for (let i = 0; i < page; i++) {
        pages[i] = { pagelink: wizardLink + "_" + i }
      }
    } else {
      wizardLink = uid.substr(0, uid.length - 5) + "_" + position;
      for (let i = 0; i < page; i++) {
        pages[i] = { pagelink: wizardLink + "_" + i }
      }
    }

    const newWizard = {
      uid: uid,
      title: title,
      pages: pages,
      position: position,
      link: wizardLink,
      status: "Drafts"
    }

    // storing new wizzard details
    const response = await new wizard(newWizard).save();
    return res.redirect(`/wizards/wedit/${response._id}`);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
}

// edit/open wizzard form
export const editWizard = async (req, res) => {
  try {
    const wid = req.params.wid;
    const uid = req.user._id;
    const role = req.user.role;
    let data;
    // finding individual wizzard details
    if(role=="user"){
      data = await wizard.find({ uid: uid, _id: wid });
    }else{
      data = await wizard.find({ _id: wid });
    }

    res.render("pages/createwizard", ({
      wizard: data[0]
    }));

  } catch (error) {
    res.status(404).render("/pages/wizards", ({
      error: error.message,
      classname: "alert-warning"
    }));
  }
}

// delete wizzard form
export const delWizard = async (req, res) => {
  try {
    const wid = req.params.wid;
    const uid = req.user._id;

    // removing from wizards
    await wizard.findOneAndDelete({ _id: wid, uid });
    // removing from wForm
    await wForm.deleteMany({ wid, uid }, function (e, doc) {
      if (doc) {
        res.status(200).send("");
      } else if (e) {
        res.status(400).json(e);
      }
    }).clone().catch(err => console.log(err.message));
    // removing wizzard data(submitted by users)
    await wData.deleteMany({ wid, uid }, function (e, doc) {
      if (doc) {
        res.status(200).send("");
      } else if (e) {
        res.status(400).json(e);
      }
    }).clone().catch(err => console.log(err.message));

  } catch (error) {
    res.render("pages/wizards", ({
      wizard: '',
      error: error.message,
      classname: 'alert-danger'
    }));
  }
}

// display wizzard form to users
export const viewWizard = async (req, res) => {
  try {
    const wid = req.params.wid;
    // finding wizzard details
    const wizardData = await wizard.findOne({ _id: wid });
    // finding wizzard pages details
    const pages = await wForm.find({ wid })

    res.render("pages/viewWizard", ({
      wizard: wizardData,
      pages: pages,
      error: '',
      message: ''
    }));

  } catch (error) {
    res.render("pages/viewWizard", ({
      wizard: '',
      error: { message: error.message, classname: "alert-danger" },
      message: ''
    }));
  }
}

// display message to user(after form submission) 
export const wizardSubmission = async (req, res) => {  
  try {
    // checking if user is logged in
    const login = await jwt.verify(req.cookies.jwt, process.env.SECRET_ID);

    res.render("pages/wizardSubmission", ({
      message: req.query.message,
      classname: req.query.classname,
      wid: req.query.wid,
      login: "yes"
    }));
    
  } catch (error) {
    // user is not logged in
    res.render("pages/wizardSubmission", ({
      message: req.query.message,
      classname: req.query.classname,
      wid: req.query.wid,
      login: "no"
    }));
  }
}