import url from 'url';

// models
import wdata from '../model/wData.js';
import wizardform from '../model/wizards.js';

// upload wizard form submission
export const uploadWizard = async (req, res)=>{
  try {
    const uid = req.params.uid;
    const wid = req.params.wid;

    const form = {
      uid,
      wid,
      data: req.body
    }

    const response = await new wdata(form).save();
    return res.redirect(url.format({
      pathname: '/submit',
      query:{
        message: "Your data has been submitted successfuly!",
        classname: "alert-success"
      }
    }))
  } catch (error) {
    return res.redirect(url.format({
      pathname: '/submit',
      query:{
        message: error.message,
        classname: "alert-danger"
      }
    }))
  }
}

export const wizards = async (req, res)=>{
  try {
    const uid=req.user._id;
    const response = await wizardform.find({uid});

    res.render("pages/wdata",({
      wizard: response,
      error: '',
      classname: ''
    }));
  } catch (error) {
    res.render("pages/wdata",({
      wizard: '',
      error: error.message,
      classname: "alert-warning"
    }));
  }
}

export const viewWizardData = async (req, res)=>{
  try {
    const wid=req.params.wid;
    const uid=req.user._id;
    
    const response = await wdata.find({wid});


    const th=Object.keys(response[0].data[0])
    // res.json(response);

    res.render("pages/viewWData",({
      wizard: response,
      th,
      error: '',
      classname: ''
    }));

  } catch (error) {
    // res.json({messag: error.message})
    res.render("pages/viewWData",({
      wizard: '',
      th: '',
      error: error.message,
      classname: 'alert-danger'
    }));
  }
}