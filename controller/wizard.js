import url from 'url';
// models
import wizard from '../model/wizards.js';
import wForm from '../model/wForm.js';

 
export const wizards = async (req, res)=>{
  try {
    const uid=req.user._id;
    const response = await wizard.find({uid})
    res.render("pages/wizards",({
      wizard: response,
      error: '',
      classname: ''
    }));
  } catch (error) {
    res.render("pages/wizards",({
      error: error.message,
      classname: "alert-danger"
    }));
  }
}

export const addWizard = async (req, res)=>{
  try {
    let uid = req.user._id.toString();
    let wizardLink;
    const {title, page} = req.body;
    let pages=[];
    let position=1;

    // checking existing wizard's count  
    const wizards = await wizard.countDocuments({uid});

    // generating links
    if(wizards>0){
      position=wizards+1;
      wizardLink = uid.substr(0, uid.length-5)+"_"+position;
      for (let i=0; i<page; i++) {
        pages[i]={pagelink: wizardLink+"_"+i}
      }
    }else{
      wizardLink = uid.substr(0, uid.length-5)+"_"+position;
      for (let i=0; i<page; i++) {
        pages[i]={pagelink: wizardLink+"_"+i}
      }
    }

    const newWizard={
      uid: uid,
      title: title,
      pages: pages,
      position: position,
      link: wizardLink,
      status: "Drafts"
    }
    const response = await new wizard(newWizard).save();
    return res.redirect(`/wizards/wedit/${response._id}`);

  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
}

export const newWizard = async (req, res)=>{
}

export const editWizard = async (req, res)=>{
  try {
    const wid = req.params.wid;
    const uid = req.user._id;
    const data = await wizard.find({uid:uid, _id: wid});

    // res.send(data);
    
    res.render("pages/createwizard",({
      wizard: data[0]
    }));

  } catch (error) {
    res.status(404).render("/pages/wizards",({
      error: error.message,
      classname: "alert-warning"
    }));
  }
}

export const delWizard = async (req, res)=>{
  try {
    const wid=req.params.wid;
    const uid=req.user._id;

    // removing from wizards
    await wizard.findOneAndDelete({_id:wid, uid});
    // removing from wForm
    await wForm.deleteMany({wid, uid},function(e,doc){
      if(doc){
        res.status(200).send("");
      }else if(e){
        res.status(400).json(e);
      }
    }).clone().catch(err=>console.log(err.message));
  } catch (error) {
    res.render("pages/wizards",({
      wizard: '',
      error: error.message,
      classname: 'alert-danger'
    }));
  }
}

export const viewWizard = async (req, res)=>{
  try {
    const wid = req.params.wid;
    const wizardData=await wizard.findOne({_id:wid});
    const pages=await wForm.find({wid})

    res.render("pages/viewWizard",({
      wizard: wizardData,
      pages: pages,
      error: '',
      message: ''
    }));

  } catch (error) {
    res.render("pages/viewWizard",({
      wizard: '',
      error: {message: error.message, classname: "alert-danger"},
      message: ''
    }));
  }  
}

export const wizardSubmission = (req, res)=>{
  const message=req.query.message;
  const classname=req.query.classname;
  
  res.render("pages/wizardSubmission",({
    message,
    classname
  }));
}