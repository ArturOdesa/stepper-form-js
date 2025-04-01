const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phonePattern = /^\+380\d{9}$/;
const loginPattern = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
const formBtn1 = document.querySelector("#btn-1");
const formBtnPrev2 = document.querySelector("#btn-2-prev");
const formBtnNext2 = document.querySelector("#btn-2-next");
const formBtn3 = document.querySelector("#btn-3");

formBtn1.addEventListener("click", function (e) {
  if (!checkFormValidation(1)) {
    e.preventDefault();
    return;
  }
  gotoNextForm(formBtn1, formBtnNext2, 1, 2);
  e.preventDefault();
});

formBtnNext2.addEventListener("click", function (e) {
  e.preventDefault();
  if (!checkFormValidation(2)) {
    e.preventDefault();
    return;
  }
  gotoNextForm(formBtnNext2, formBtn3, 2, 3);
  e.preventDefault();
});

formBtnPrev2.addEventListener("click", function (e) {
  gotoNextForm(formBtnNext2, formBtn1, 2, 1);
  e.preventDefault();
});

formBtn3.addEventListener("click", function (e) {
  e.preventDefault();
  if (!checkFormValidation(3)) {
    e.preventDefault();
    return;
  }
  document.querySelector(`.step--3`).classList.remove("step-active");
  document.querySelector(`.step--4`).classList.add("step-active");
  formBtn3.parentElement.style.display = "none";
  document.querySelector(".form--message").innerHTML = `
   <h1 class="form--message-text">Your account is successfully created </h1>
   `;
  e.preventDefault();
});

const gotoNextForm = (prev, next, stepPrev, stepNext) => {
  const prevForm = prev.parentElement;
  const nextForm = next.parentElement;

  const nextStep = document.querySelector(`.step--${stepNext}`);
  const prevStep = document.querySelector(`.step--${stepPrev}`);

  nextForm.classList.add("form-active");
  nextForm.classList.add("form-active-animate");
  prevForm.classList.add("form-inactive");
  prevStep.classList.remove("step-active");
  nextStep.classList.add("step-active");

  setTimeout(() => {
    prevForm.classList.remove("form-active");
    prevForm.classList.remove("form-inactive");
    nextForm.classList.remove("form-active-animate");
  }, 1000);
};

function checkFormValidation(step) {
  const form = document.forms[step - 1];
  let isValid;
  switch (step) {
    case 1:
      isValid = formOneValidity(form);
      break;
    case 2:
      isValid = formTwoValidity(form);
      break;
    case 3:
      isValid = formThreeValidity(form);
      break;
  }
  return isValid;
}

function formOneValidity(form) {
  const name = form.name;
  const email = form.email;
  const phone = form.phone;
  const nameValue = name.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = phone.value.trim();
  name.classList.remove("required");
  email.classList.remove("required");
  phone.classList.remove("required");
  if (
    !nameValue ||
    !emailValue ||
    !emailPattern.test(emailValue) ||
    !phoneValue ||
    !phonePattern.test(phoneValue)
  ) {
    if (!nameValue) {
      name.placeholder = "This field is required";
      name.classList.add("required");
    }

    if (!emailValue) {
      email.placeholder = "This field is required";
      email.classList.add("required");
    }
    if (!emailPattern.test(emailValue)) {
      email.value = "";
      email.placeholder = "Invalid email format";
      email.classList.add("required");
    }
    if (!phoneValue) {
      phone.placeholder = "This field is required";
      phone.classList.add("required");
    }
    if (!phonePattern.test(phoneValue)) {
      phone.value = "";
      phone.placeholder = "Invalid phone format";
      phone.classList.add("required");
    }
    return false;
  } else return true;
}

function formTwoValidity(form) {
  const login = form.login;
  const password = form.password;
  const passwordConfirm = form.passwordConfirm;
  const loginValue = login.value.trim();
  const passwordValue = password.value;
  const passwordConfirmValue = passwordConfirm.value;

  login.classList.remove("required");
  password.classList.remove("required");
  passwordConfirm.classList.remove("required");

  if (
    !loginPattern.test(loginValue) ||
    !passwordPattern.test(passwordValue) ||
    !passwordConfirmValue ||
    passwordValue !== passwordConfirmValue
  ) {
    if (!loginPattern.test(loginValue)) {
      login.value = "";
      login.placeholder = "Invalid login format";
      login.classList.add("required");
    }

    if (!passwordPattern.test(passwordValue)) {
      password.value = "";
      password.placeholder = "Invalid password format";
      password.classList.add("required");
    }

    if (passwordConfirmValue !== passwordValue) {
      passwordConfirm.value = "";
      passwordConfirm.placeholder = "Password and confirm should be equal";
      password.classList.add("required");
      passwordConfirm.classList.add("required");
    }
    return false;
  } else return true;
}

function formThreeValidity(form) {
  const company = form.company;
  const job = form.job;
  const location = form.location;
  const companyValue = company.value.trim();
  const jobValue = job.value.trim();
  const locationValue = location.value.trim();

  company.classList.remove("required");
  job.classList.remove("required");
  location.classList.remove("required");

  if (!companyValue || !jobValue || !locationValue) {
    if (!companyValue) {
      company.placeholder = "This field is required";
      company.classList.add("required");
    }
    if (!jobValue) {
      job.placeholder = "This field is required";
      job.classList.add("required");
    }
    if (!locationValue) {
      location.placeholder = "This field is required";
      location.classList.add("required");
    }
    return false;
  } else return true;
}
