// url module to use url.formate method
import url from 'url';

// models
import wdata from '../model/wData.js';
import wizardform from '../model/wizards.js';

// upload wizard form submission controller
export const uploadWizard = async (req, res) => {
  try {
    const uid = req.params.uid;
    const wid = req.params.wid;

    const form = {
      uid,
      wid,
      data: req.body
    }
    // adding into database
    await new wdata(form).save();
    return res.redirect(url.format({
      pathname: '/submit',
      query: {
        message: "Your data has been submitted successfuly!",
        classname: "alert-success",
        wid
      }
    }))
  } catch (error) {
    return res.redirect(url.format({
      pathname: '/submit',
      query: {
        message: error.message,
        classname: "alert-danger",
        wid
      }
    }))
  }
}

// display wizzards for data
export const wizards = async (req, res) => {
  try {
    const uid = req.user._id;
    const role = req.user.role;
    let response;

    // checking user role
    if (role == "user") {
      response = await wizardform.find({ uid });
    } else {
      response = await wizardform.find();
    }

    res.render("pages/wdata", ({
      wizard: response,
      error: '',
      classname: ''
    }));
  } catch (error) {
    res.render("pages/wdata", ({
      wizard: '',
      error: error.message,
      classname: "alert-warning"
    }));
  }
}

// view individual wizzard data
export const viewWizardData = async (req, res) => {
  try {
    const wid = req.params.wid;
    const uid = req.user._id;
    const role = req.user.role;
    let response;
    // checking user role
    if (role == "user") {
      response = await wdata.find({ wid, uid });
    } else {
      response = await wdata.find({ wid });
    }

    if (response.length > 0) {
      const th = Object.keys(response[0].data[0]);
      res.render("pages/viewWData", ({
        wizard: response,
        th,
        error: '',
        classname: ''
      }));
    } else {
      res.render("pages/viewWData", ({
        wizard: '',
        th: '',
        error: '',
        classname: ''
      }));
    }
  } catch (error) {
    res.render("pages/viewWData", ({
      wizard: '',
      th: '',
      error: error.message,
      classname: 'alert-danger'
    }));
  }
}

// delete individual wizard data only (submitted by users)
export const delWizardData = async (req, res) => {
  try {
    const wid = req.params.wid;
    const uid = req.user._id;
    
    // removing all entries
    const response = await wdata.deleteMany({ wid, uid });

    if (response.deletedCount > 0) {
      return res.redirect("/wdata")
    } else {
      res.redner("pages/wdata", ({
        wizard: '',
        error: "Failed to Delete, try again!",
        classname: 'alert-warning'
      }))
    }

  } catch (error) {
    res.json(error);
  }
}