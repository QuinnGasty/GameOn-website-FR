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
const modalSubmitClose = document.querySelector("#btn-submit-close");
const form = document.querySelector('#subscriptionform');

// RegEx
const regExEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$','g');
const regExBirthdate = new RegExp(/^((19[3-9]+[0-9]|200[0-9])-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01])|(0?[1-9]|[12]\d|3[01])[/](0?[1-9]|1[0-2])[/](19[3-9]+[0-9]|200[0-6]))$/);
const regExNb = new RegExp(/^([0-9]){1,2}$/);

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  document.querySelector(".modal-body").style.display = "block";
  document.querySelector(".modal-success").style.display = "none";
}

// close modal form
modalBtnClose.addEventListener ("click", () => {
  modalbg.style.display = "none";
})

modalSubmitClose.addEventListener("click", () => {
  modalbg.style.display = "none";
})

let validPrenom = validNom = validMail = validBirthdate = validParticipations = validCity = validcgu = false;

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
    validPrenom = validtext(first, infofirst);
  });

  form.last.addEventListener("change", () => {
    validNom = validtext(last, infolast);
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
    validMail = validEmail(email, infoemail);
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
      msg = 'Veuillez entrer une date de naissance valide';
      info.classList.remove('no-error');
      info.classList.add('error');
    }
    info.textContent = msg;
    return valid;
  }

  form.birthdate.addEventListener("change", () => {
    validBirthdate = validDate(birthdate, infodate);
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
    validParticipations = validNumber(quantity, infonumber);
  })

  // location validation
  const validLocation = function(info) {
    let msg = "";
    let valid = false;
    if ((location1.checked||location2.checked||location3.checked||location4.checked||location5.checked||location6.checked)) {
      msg = '';
      valid = true;
      info.textContent = "";
    } else {
      msg = "Veuillez sélectionner une ville";
      info.classList.add('error');
    }
    info.textContent = msg;
    return valid;
  }

  const locations = [location1, location2, location3, location4, location5, location6];
  locations.forEach(location => {
    location.addEventListener('click', () => {
      validCity = validLocation('infolocation');
      infolocation.textContent = "";
    })
  })

  // CGU validation
  const validCGU = function(checkbox1, info) {
    let msg;
    let valid = false;
    if (!checkbox1.checked) {
      msg = 'Merci d\'accepter les conditions générales d\'utilisation';
      info.classList.add('error');
    } else {
      msg = "";
      valid = true;
    }
    info.textContent = msg;
    return valid;
  }

  form.checkbox1.addEventListener("change", () => {
    validcgu = validCGU(checkbox1, infocgu);
  })

  const validate = (event) => {
    event.preventDefault();

   if(!validCity) {
     infolocation.textContent = "Veuillez choisir une ville";
   } 
   
   if(!validPrenom) {
     infofirst.textContent = "Veuillez saisir un prénom";
   } 
   
   if(!validNom) {
     infolast.textContent = "Veuillez saisir un nom";
   } 
   
   if(!validMail) {
     infoemail.textContent = "Veuillez saisir une adresse email";
   } 
   
   if(!validBirthdate) {
     infodate.textContent = "Veuillez saisir une date de naissance";
   } 
   
   if(!validParticipations) {
     infonumber.textContent = "Veuillez renseigner le nombre de participations"
   } 

   if(!validcgu) {
     infocgu.textContent = "Veuillez accepter les conditions générales d'utilisation"
   }

    if(validPrenom && validNom && validMail && validBirthdate && validParticipations && validCity && validcgu) {
      document.querySelector(".modal-body").style.display = "none";
      document.querySelector(".modal-success").style.display = "block";
      resetForm();
    }
  }

  function resetForm() {
    form.reset();
    document.querySelectorAll('small').forEach(s => s.textContent = "");
    validPrenom = validNom = validMail = validBirthdate = validParticipations = validCity = validcgu = false;
  }


