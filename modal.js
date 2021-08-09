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
const regExBirthdate = new RegExp(/^((19[3-9]+[0-9]|200[0-9])-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01])|(0?[1-9]|[12]\d|3[01])[/](0?[1-9]|1[0-2])[/](19[3-9]+[0-9]|200[0-6]))$/);
const regExNb = new RegExp(/^([0-9]){1,2}$/);

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

// name and surname validation
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

  // email validation
  const validEmail = function(inputEmail, info) {
    let msg;
    let valid = false;
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputEmail.value)) {
      msg = 'Adresse valide';
      info.classList.remove('error');
      info.classList.add('no-error');
      valid = true;
    } else {
      msg = 'Adresse non valide';
      info.classList.remove('no-error');
      info.classList.add('error');
    } 
    info.textContent = msg;
    return valid;
  };

  form.email.addEventListener("change", () => {
    validEmail(email, infoemail);
  });

  // birthdate validation
  const validDate = function(inputDate, info) {
    let msg;
    let valid = false;
    if (regExBirthdate.test(inputDate.value)) {
      msg = 'Date valide'
      info.classList.add('no-error');
      info.classList.remove('error');
      valid = true;
    } else {
      msg = 'Date non valide';
      info.classList.remove('no-error');
      info.classList.add('error');
    }
    info.textContent = msg;
    return valid;
  }

  form.birthdate.addEventListener("change", () => {
    validDate(birthdate, infodate);
  })

  //  number of tournaments validation
  const validNumber = function(inputNumber, info) {
    let msg;
    let valid = false;
    if (regExNb.test(inputNumber.value)) {
      msg = 'Valide'
      info.classList.add('no-error');
      info.classList.remove('error');
      valid = true;
    } else {
      msg = 'Ce champs doit comporter une valeur numérique comprise entre 0 et 99';
      info.classList.add('error');
      info.classList.remove('no-error');
    }
    info.textContent = msg;
    return valid;
  }

  form.quantity.addEventListener("change", () => {
    validNumber(quantity, infonumber);
  })

  // 

  //function addition(a,b) {
    //console.log(`${a} + ${b} = ${a+b}`);
  //}
  //addition(12,3)
