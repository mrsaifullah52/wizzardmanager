function newform(){

  const form=document.getElementById('creatform');

  const title=form.elements['title'].value;
  const pages=form.elements['pages'].value;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };
  xhttp.open("GET", `data/${title}/${pages}`, true);
  xhttp.send();


}


// creatform.addEventListener('submit', function (event){
//   event.preventDefault();

//   console.log("Form Submit");

//   const title=creatform.element['title'].value;
//   const pages=creatform.element['pages'].value;

//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       console.log(this.responseText);
//     }
//   };
//   xhttp.open("GET", `data/${title}/${pages}`, true);
//   xhttp.send();
// })