const submitButton = document.querySelector(".register-form-button__submit");

function emailValidation() {
  const email = document.querySelector("#user__email").value;
  const validationTextItem = document.querySelector(".validation__text li");
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   Email validation
  email.length === 0
    ? (validationTextItem.classList.remove("legit"),
      validationTextItem.classList.remove("fake"))
    : email.match(pattern)
    ? (validationTextItem.classList.add("legit"),
      validationTextItem.classList.remove("fake"),
      (validationTextItem.style.display = "block"),
      (validationTextItem.innerHTML = "Your Email is Valid"))
    : (validationTextItem.classList.add("fake"),
      validationTextItem.classList.remove("legit"),
      (validationTextItem.style.display = "block"),
      (validationTextItem.innerHTML = "Please Enter Valid Email"));

  validateForm();
}

function passwordValidtion(data) {
  const lowerCaseInput = document.querySelector("#checkLowerCase");
  const upperCaseInput = document.querySelector("#checkUpperCase");
  const numberInput = document.querySelector("#checkNumber");
  const specialCharInput = document.querySelector("#checkSpecialChar");
  const lengthInput = document.querySelector("#checkLength");

  const lower = new RegExp("(?=.*[a-z])");
  const upper = new RegExp("(?=.*[A-Z])");
  const number = new RegExp("(?=.*[0-9])");
  const special = new RegExp("(?=.*[ !@#$%^&*])");
  const length = new RegExp("(?=.{8,})");

  // Lowercase validation check
  lower.test(data)
    ? (lowerCaseInput.classList.add("legit"),
      lowerCaseInput.classList.remove("fake"))
    : (lowerCaseInput.classList.remove("legit"),
      lowerCaseInput.classList.add("fake"));
  // Uppercase validation check
  upper.test(data)
    ? (upperCaseInput.classList.add("legit"),
      upperCaseInput.classList.remove("fake"))
    : (upperCaseInput.classList.remove("legit"),
      upperCaseInput.classList.add("fake"));
  // Number validation check
  number.test(data)
    ? (numberInput.classList.add("legit"), numberInput.classList.remove("fake"))
    : (numberInput.classList.remove("legit"),
      numberInput.classList.add("fake"));
  // Special Character validation check
  special.test(data)
    ? (specialCharInput.classList.add("legit"),
      specialCharInput.classList.remove("fake"))
    : (specialCharInput.classList.remove("legit"),
      specialCharInput.classList.add("fake"));
  // Min Length validation check
  length.test(data)
    ? (lengthInput.classList.add("legit"), lengthInput.classList.remove("fake"))
    : (lengthInput.classList.remove("legit"),
      lengthInput.classList.add("fake"));

  validateForm();
}

function validateForm() {
  const emailValid = document
    .querySelector(".validation__text li")
    .classList.contains("legit");
  const passwordValid =
    document.querySelectorAll(".validation__text li.legit").length === 6;

  emailValid && passwordValid
    ? submitButton.classList.remove("disabled")
    : submitButton.classList.add("disabled");
}

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  if (submitButton.classList.contains("disabled")) {
    return;
  }

  let successField = document.querySelector(".register-form-success__field");
  successField.style.display = "block";
  setTimeout(() => {
    submitButton.classList.add("disabled");
  }, 1000);
});
