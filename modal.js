function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalBtnClose = document.querySelector(".close");
const form = document.querySelector('#subscriptionform')

// RegEx
const regExEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$','g');
const regExDate = new RegExp('^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)([1930-2011]){4}$', 'g');
const regExNb = new RegExp(/^[0-9]+$/, 'g');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
modalBtnClose.addEventListener ("click", () => {
  modalbg.style.display = "none";
})

const validtext = function(inputid, info) {
  let msg;
  let valid = false;
  if (inputid.value.length < 2) {
    msg = 'Le champ doit contenir au moins 2 caractères';
    info.classList.add('error');
    info.classList.remove('no-error');
  } else if (/[0-9]/.test(inputid.value)) {
    msg = 'Ce champ ne peut pas contenir de valeur numérique';
    info.classList.add('error');
    info.classList.remove('no-error');
  } else if (/[!@#$%^&*(),.?":{}|<>]/.test(inputid.value)) {
    msg = 'Ce champ ne peut pas contenir de caractères spéciaux'
    info.classList.add('error');
    info.classList.remove('no-error');
  } else {
    msg = 'Champ valide';
    info.classList.add('no-error');
    info.classList.remove('error');
    valid = true;
  } 
  info.textContent = msg;
  return valid;
};

  form.first.addEventListener("change", () => {
    validtext(first, infofirst);
  });

  form.last.addEventListener("change", () => {
    validtext(last, infolast);
  });

  //function addition(a,b) {
    //console.log(`${a} + ${b} = ${a+b}`);
  //}
  //addition(12,3)
