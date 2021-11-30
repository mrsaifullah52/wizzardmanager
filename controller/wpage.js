
import url from 'url';
// models
import wizard from '../model/wizards.js';
import wForm from '../model/wForm.js';


// add new page in wizzard
export const newPage = async (req, res) => {
  try {
    const wid = req.params.wid;
    const uid = req.params.uid;
    // generating link for it
    let wizardLink = uid.substr(0, uid.length - 5);
    const response = await wizard.findOne({ _id: wid }, function (e, doc) {
      if (doc) {
        const exist = doc.pages.length;
        wizardLink = wizardLink + "_" + doc.position + "_" + (exist);

        doc.pages.push({ pagelink: wizardLink })
        doc.save();
      }
    }).clone().catch(err => console.log(err));

    return res.redirect(`/wizards/wedit/${response._id}`);
  } catch (error) {
    res.send(error)
  }
}

// store content of wizzard pages
export const addWForm = async (req, res) => {
  try {
    const uid = req.params.uid;
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
    const response = await wForm.findOneAndUpdate({ uid, wid, pid }, wData, { upsert: true });
    res.status(201).send(response);
  } catch (error) {
    res.send(error.message)
  }
}

// display wizard page form(display previous data if any)
export const editWForm = async (req, res) => {
  const wid = req.params.wid;
  const pid = req.params.pid;
  const uid = req.params.uid;

  // finding previous data for related page
  const response = await wForm.find({ wid, pid, uid }, function (e, r) {
    if (!r.length) {
      res.render("pages/wizards/edit", ({
        pid: pid,
        wid: wid,
        uid:uid,
        data: ''
      }));
    } else {
      res.render("pages/wizards/edit", ({
        data: r[0]
      }));
    }
  }).limit(1).clone().catch(function (err) { console.log(err) });
}

// view output of wizzard's individual page
export const viewWForm = async (req, res) => {
  try {
    const wid = req.params.wid;
    const pid = req.params.pid;

    // finding page content
    const response = await wForm.find({ wid: wid, pid: pid }, function (e, r) {
      if (r.length > 0) {
        res.render("pages/wizards/view", ({
          page: r[0],
          error: ''
        }))
      } else {
        res.render("pages/wizards/view", ({
          page: {
            wid: wid,
            pid: '',
            form: []
          },
          error: { message: "Oops! it seems we have nothing for this page. You can", classname: "alert-warning" }
        }))
      }
    }).clone().catch(err => console.log(err.message));

  } catch (error) {
    res.render("pages/wizards/view", ({
      page: {
        wid: wid,
        pid: '',
        form: []
      },
      error: { message: "Oops! it seems we have nothing for this page. You can", classname: "alert-warning" }
    }))
  }
}

// delete wizzard page
export const delWForm = async (req, res) => {
  try {
    const wid = req.params.wid;
    const pid = req.params.pid;
    const uid = req.params.uid;

    // removing from wizard
    await wizard.findOne({ uid, _id: wid }, function (e, doc) {
      if (doc) {
        doc.pages = doc.pages.filter((cElem) => {
          return cElem.pagelink !== pid;
        });
        doc.save();
      }
    }).clone().catch(err => console.log(err.message));

    // removing from wForm
    const response = await wForm.findOneAndDelete({ pid, uid, wid });
    res.status(200).send(response);

  } catch (error) {
    res.status(400).json(error.message);
  }
}
