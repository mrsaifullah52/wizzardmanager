// create empty 
function buildForm(){
  var elment = document.getElementById("build-wrap");
  var options = {
    onSave: function (evt, formData) {
      saveForm(formData);
      // console.log(formData)
    },
    disableFields: ['autocomplete', 'date', 'hidden', 'number', 'button'],
    disabledActionButtons: ['data'],
    replaceFields: [{
      type: "header",
      label: "Heading",
    },{
      type: "file",
      label: "Image Upload"
    },{
      type: "textarea",
      label: "Multiline Text"
    },{
      type: "text",
      label: "Text Box"
    },{
      type: "radio-group",
      label: "RadioButtons list"
    },{
      type: "checkbox-group",
      label: "CheckBox list"
    }],
    disabledAttrs: ["className", "access", "name", "subtype", "value", "description", "placeholder"],
    i18n: {
      location: 'https://formbuilder.online/assets/lang/'
    }
  };
  $(elment).formBuilder(options);
}
// if already stored
function setFormData(data){
  var elment = document.getElementById("build-wrap");
  var options = {
    onSave: function (evt, formData) {
      saveForm(formData);
      // console.log(formData)
    },
    disableFields: ['autocomplete', 'date', 'hidden', 'number', 'button'],
    disabledActionButtons: ['data'],
    replaceFields: [{
      type: "header",
      label: "Heading",
    },{
      type: "file",
      label: "Image Upload"
    },{
      type: "textarea",
      label: "Multiline Text"
    },{
      type: "text",
      label: "Text Box"
    },{
      type: "radio-group",
      label: "RadioButtons list"
    },{
      type: "checkbox-group",
      label: "CheckBox list"
    }],
    disabledAttrs: ["className", "access", "name", "subtype", "value", "description", "placeholder"],
    i18n: {
      location: 'https://formbuilder.online/assets/lang/'
    }
  };

  $(elment).formBuilder(options).promise.then((formBuilder) => {
    formBuilder.actions.setData(data);
  });
}
// store to database
async function saveForm(data){
  // sending data to server realtime
  const pid=document.getElementById('pid').value;
  const wid=document.getElementById('wid').value;
  const response=await fetch(`/wizards/addwform/${wid}/${pid}`,{
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  });

  // display alert
  const notifications = document.getElementById("notifications");
  const note=document.createElement('span');
  const dismiseNote=()=>{
    note.remove();
  }
  if(response.status==201){
    note.innerHTML="Page has been Saved";
    note.setAttribute("class","alert alert-success");
    notifications.appendChild(note);
    setTimeout(dismiseNote,5000);
  }else{
    note.innerHTML="Failed to Store!";
    note.setAttribute("class","alert alert-danger");
    notifications.appendChild(note);
    setTimeout(dismiseNote,5000);
  }
}
// get output
function printOnScreen(formData){
  var fbRender = document.getElementById('render-wrap');

  var formRenderOpts = {
    formData,
    dataType: 'json',
    i18n: {
      location: 'https://formbuilder.online/assets/lang/'
    },
  };

  // console.log(formData);

  $(fbRender).formRender(formRenderOpts)
}
