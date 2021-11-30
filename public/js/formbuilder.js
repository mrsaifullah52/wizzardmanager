// display form building tools 
function buildForm() {
  // where to display
  var elment = document.getElementById("build-wrap");
  // formbuilder options
  var options = {
    onSave: function (evt, formData) {
      saveForm(formData);
    },
    disableFields: ['autocomplete', 'date', 'hidden', 'number', 'button'],
    disabledActionButtons: ['data'],
    replaceFields: [{
      type: "header",
      label: "Label",
    }, {
      type: "file",
      label: "File Upload"
    }, {
      type: "textarea",
      label: "Multiline Text"
    }, {
      type: "text",
      label: "Text Box"
    }, {
      type: "radio-group",
      label: "RadioButtons list"
    }, {
      type: "checkbox-group",
      label: "CheckBox list"
    }],
    disabledAttrs: ["className", "access", "value", "rows", "type", "subtype", "description", "placeholder"],
    i18n: {
      location: 'https://formbuilder.online/assets/lang/'
    }
  };
  // rendering into HTML
  $(elment).formBuilder(options);
}

// if already stored
function setFormData(data) {
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
    }, {
      type: "file",
      label: "Image Upload"
    }, {
      type: "textarea",
      label: "Multiline Text"
    }, {
      type: "text",
      label: "Text Box"
    }, {
      type: "radio-group",
      label: "RadioButtons list"
    }, {
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
async function saveForm(data) {
  // sending data to server realtime
  const pid = document.getElementById('pid').value;
  const wid = document.getElementById('wid').value;
  const uid = document.getElementById('uid').value;
  // sending request
  const response = await fetch(`/wizards/addwform/${wid}/${uid}/${pid}`, {
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
  const note = document.createElement('span');
  const dismiseNote = () => {
    note.remove();
  }

  if (response.status == 201) {
    note.innerHTML = "Page has been Saved";
    note.setAttribute("class", "alert alert-success");
    notifications.appendChild(note);
    setTimeout(dismiseNote, 3000);
  } else {
    note.innerHTML = "Failed to Store!";
    note.setAttribute("class", "alert alert-danger");
    notifications.appendChild(note);
    setTimeout(dismiseNote, 3000);
  }
}

// display form from JSON
function printOnScreen(formData, divId) {
  var renderer = document.getElementById(divId);
  var formRenderOpts = {
    formData,
    dataType: 'json',
    i18n: {
      location: 'https://formbuilder.online/assets/lang/'
    },
  };
  $(renderer).formRender(formRenderOpts)
}
