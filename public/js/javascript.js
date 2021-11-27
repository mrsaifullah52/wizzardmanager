// function newform(){

//   const form=document.getElementById('creatform');

//   const title=form.elements['title'].value;
//   const pages=form.elements['pages'].value;

//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       console.log(this.responseText);
//     }
//   };
//   xhttp.open("GET", `data/${title}/${pages}`, true);
//   xhttp.send();
// }

// login form submission
// const loginForm = document.getElementById('login');
// if(loginForm!=null){
//   loginForm.addEventListener('submit', function (event){
//     event.preventDefault();
  
//     const {email,pass} = loginForm.elements;
//     const data = {"email":email.value,"pass":pass.value};

//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//       if (this.readyState == 4 && this.status == 200) {
//         console.log(this.responseText);
//       }else if(this.readyState == 4 && this.status == 401){
//         console.log(this.responseText);
//       }
//     };
//     xhttp.open("POST", 'login', true);
//     xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     xhttp.send(JSON.stringify(data));
//   });
// }

// // registeration form submission
// const registerForm = document.getElementById('register');
// if(registerForm!=null){
//   registerForm.addEventListener('submit', function (event){
//     event.preventDefault();
  
//     const {fname, lname, email, pass} = registerForm.elements;
  
//     const data={
//       "fname": fname.value,
//       "lname": lname.value,
//       "email": email.value,
//       "password": pass.value
//     }
  
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//       if (this.readyState == 4 && this.status == 201) {
//         console.log(this.responseText);
//       }else{
//         console.log(this.responseText);
//       }
//     };
//     xhttp.open("POST", `register`, true);
//     xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     xhttp.send(JSON.stringify(data));
//   });
// }

// copyWizardLink function
function copyWizardLink(id){
  const url=`http://localhost:3333/wform/${id}`;
  navigator.clipboard.writeText(url);
  document.getElementById("copy"+id).innerHTML = "Link Copied!";
}

async function deleteWizard(wid){
  // ask for data deletion permission
  const url=`/wizards/delWizard/${wid}`;
  const response=await fetch(url,{
    method: 'DELETE'
  });
  if(response.status==200){
    window.location.reload();
  }
}

async function deleteWForm(wid, pid){
  const url=`/wizards/deletepage/${wid}/${pid}`;
  const response=await fetch(url,{
    method: 'DELETE'
  });
  if(response.status==200){
    window.location.reload();
  }else{
    console.log(response);
  }
}