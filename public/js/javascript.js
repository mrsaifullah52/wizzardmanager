// copyWizardLink function
function copyWizardLink(id) {
  const url = `http://localhost:3333/vWizard/${id}`;
  navigator.clipboard.writeText(url);
  document.getElementById("copy" + id).innerHTML = "Link Copied!";
}

// delete wizard
async function deleteWizard(wid) {
  // ask for data deletion permission
  const url = `/wizards/delWizard/${wid}`;
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
async function deleteWForm(wid, pid) {
  const url = `/wizards/deletepage/${wid}/${pid}`;
  const response = await fetch(url, {
    method: 'DELETE'
  });
  if (response.status == 200) {
    window.location.reload();
  } else {
    console.log(response);
  }
}