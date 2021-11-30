// copyWizardLink function
function copyWizardLink(id) {
  const host=window.location.hostname;
  const url = `${host}/vWizard/${id}`;
  navigator.clipboard.writeText(url);
  document.getElementById("copy" + id).innerHTML = "Link Copied!";
}

// delete wizard
async function deleteWizard(wid) {
  const url = `/wizards/delWizard/${wid}`;
  // sending deletion request
  const response = await fetch(url, {
    method: 'DELETE'
  });
  if (response.status == 200) {
    window.location.reload();
  } else {
    console.log("JavaScript");
    console.log(response);
  }
}

// delete page inside wizard
async function deleteWForm(wid, uid, pid) {
  const url = `/wizards/deletepage/${wid}/${uid}/${pid}`;
  // sending deletion request
  const response = await fetch(url, {
    method: 'DELETE'
  });
  if (response.status == 200) {
    window.location.reload();
  } else {
    console.log(response);
  }
}