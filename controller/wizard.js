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
    res.render("pages/createwizard",({
      wizard: response
    }));

  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }




  // res.render("pages/wizards",({
  // }))
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
    await wizard.findOneAndDelete({wid, uid});
    const response = await wizard.find({uid})
    res.status(200).render("pages/wizards",({
      wizard: response,
      error: '',
      classname: ''
    }));
  } catch (error) {
    res.render("pages/wizards",({
      wizard: '',
      error: error.message,
      classname: 'alert-danger'
    }));
  }
}

// wizard pages
export const newPage = async (req, res)=>{  
  try {
    const wid = req.params.wid;
    const uid = req.user._id.toString();
    const wizardLink=uid.substr(0, uid.length-5);

    const wizards=await wizard.countDocuments({uid});

    await wizard.find({_id: wid},function(e, doc){
      if(doc){
        const exist = doc.pages.length;
        if(exist>0){
          wizardLink=wizardLink+"_"+(wizards)
        }
      }

      res.send(doc);

    }).clone().catch(err=>console.log(err));

  } catch (error) {
    res.send(error)
  }  
}

export const addWForm = async (req, res)=>{
  try {
    const uid = req.user._id;
    const wid = req.params.wid;
    const pid = req.params.pid;
    const wBody = req.body;
  
    const wData = {
      uid: uid,
      wid: wid,
      pid: pid,
      form: wBody
    }
    // find and update / insert new
    const response=await wForm.findOneAndUpdate({uid,wid,pid},wData,{upsert:true});
    res.status(201).send(response);
  } catch (error) {
    res.send(error.message)
  }
}

export const editWForm = async (req, res)=>{
  const wid=req.params.wid;
  const pid=req.params.pid;
  const uid=req.user._id;

  const response=await wForm.find({wid,pid,uid},function(e,r){
    if(!r.length){
      res.render("pages/wizards/edit",({
        pid:pid,
        wid:wid,
        data: ''
      }));
    }else{
      console.log(r);
      res.render("pages/wizards/edit",({
        data: r[0]
      }));
    }
  }).limit(1).clone().catch(function(err){ console.log(err)});
}

export const viewWForm = async (req, res)=>{
  try {
    const wid=req.params.wid;
    const pid=req.params.pid;
    const uid=req.user._id;
  
    const response=await wForm.find({uid:uid, wid:wid, pid:pid}, function(e, r){
      if(r.length>0){
        res.render("pages/wizards/view",({
          page: r[0],
          error: ''
        }))
      }else{
        res.render("pages/wizards/view",({
          page: {
            wid: wid,
            pid: '',
            form: []
          },
          error: {message: "You haven't created any content for this page",classname: "alert-warning"}
        }))
      }
    }).clone().catch(err=>console.log(err.message));
    



    // res.send(response[0]);

  } catch (error) {
    
  }
}

export const wform = async (req, res)=>{
  res.render("pages/wform");
}

export const delWForm = async (req, res)=>{
  try {
    const wid = req.params.wid;
    const pid = req.params.pid;
    const uid = req.user._id;
    // const uid ="619e78ad68f3c2c02f070eb4";


    await wizard.findOne({uid, _id:wid}, function(e,doc){
      if(doc){
        doc.pages=doc.pages.filter((cElem)=>{
          return cElem.pagelink !== pid;
        });
        doc.save();
      }
    }).clone().catch(err=>console.log(err));

    const response = await wForm.findOneAndDelete({pid, uid, wid}, function(e,doc){
      if(doc){
        res.status(200).send(doc);
      }
    }).clone().catch(err=>console.log(err.message))

  } catch (error) {
    res.status(400).json(error.message);
  }
}
