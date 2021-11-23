jQuery(function ($) {
  var fbTemplate = document.getElementById("build-wrap");
  var options = {
    onSave: function (evt, formData) {
      printOnScreen(formData);
    },
    disableFields: ['autocomplete', 'date', 'hidden', 'number'],
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
    },
  };
  $(fbTemplate).formBuilder(options);
});

function printOnScreen(formData){
  var fbRender = document.getElementById('render-wrap');
  var build = document.getElementById('build-wrap');

  build.style.display="none";

  var formRenderOpts = {
    formData,
    dataType: 'json',
    i18n: {
      location: 'https://formbuilder.online/assets/lang/'
    },
  };

  console.log(formData);

  $(fbRender).formRender(formRenderOpts)
}
