// select HTML elements
const form = document.querySelector(".form");
const inputs = document.querySelectorAll(".form-group input");
const errorMsg = document.querySelectorAll(".error-msg");
const cardHolderName = document.getElementById("card-holder");
const cardNumber = document.getElementById("card-number");
const cardExpMonth = document.getElementById("card-exp-month");
const cardExpYear = document.getElementById("card-exp-year");
const cardCvc = document.getElementById("card-cvc");
const datesErrorMsg = document.querySelector(".dates-error-msg");

// funcion for input event listener
function inputEventListener(input, datesInput) {
  input.forEach(function (input) {
    input.addEventListener("input", function () {
      if (!input.value.length) {
        input.parentElement.classList.add("invalid");
      } else {
        input.parentElement.classList.remove("invalid");
        input.nextElementSibling.textContent = "";
      }
    });
  });
  datesInput.forEach(function (dates) {
    dates.addEventListener("input", function () {
      if (!dates.value.length) {
        dates.parentElement.classList.add("invalid");
      } else {
        dates.parentElement.classList.remove("invalid");
        datesErrorMsg.textContent = "";
      }
    });
  });
}

// function to display content
function displayContents(inputs) {
  // replace display card details with user input
  const cardDisplayNumber = document.querySelector(".card-number");
  const cardDisplayName = document.querySelector(".card-holder");
  const cardDisplayDates = document.querySelector(".exp-dates");
  const cardDisplayCvc = document.querySelector(".card-cvc");
  inputs.forEach(function (input) {
    input.addEventListener("input", function () {
      cardDisplayName.textContent = cardHolderName.value;
      cardDisplayNumber.textContent = cardNumber.value;
      cardDisplayDates.textContent = `${cardExpMonth.value}/${cardExpYear.value}`;
      cardDisplayCvc.textContent = cardCvc.value;
    });
  });
}

displayContents(inputs);

// function to validate month/year
function validateDates() {
  // get current year to validated card exp year
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  let currentYear = date.getFullYear().toString();
  currentYear = Number(currentYear[2] + currentYear[3]);
  estimatedExpYear = currentYear + 10;

  // conditions
  if (!cardExpMonth.value && !cardExpYear.value) {
    cardExpMonth.parentElement.classList.add("invalid");
    cardExpYear.parentElement.classList.add("invalid");
    datesErrorMsg.textContent = "Can't be blank";
  } else if (!cardExpMonth.value && cardExpYear.value) {
    cardExpMonth.parentElement.classList.add("invalid");
    cardExpYear.parentElement.classList.remove("invalid");
    datesErrorMsg.textContent = "Can't be blank";
  } else if (cardExpMonth.value && !cardExpYear.value) {
    cardExpYear.parentElement.classList.add("invalid");
    cardExpMonth.parentElement.classList.remove("invalid");
    datesErrorMsg.textContent = "Can't be blank";
  } else if (
    Number(cardExpMonth.value) > 12 ||
    Number(cardExpMonth.value) == 0
  ) {
    console.log(cardExpMonth.value);
    cardExpMonth.parentElement.classList.add("invalid");
    datesErrorMsg.textContent = "Invalid month";
    console.log(datesErrorMsg.textContent);
  } else if (
    Number(cardExpMonth.value) >= 1 &&
    Number(cardExpMonth.value) < currentMonth &&
    Number(cardExpYear.value) == currentYear
  ) {
    cardExpMonth.parentElement.classList.add("invalid");
    // cardExpYear.parentElement.classList.add("invalid");
    datesErrorMsg.textContent = "Card has expired";
  } else if (Number(cardExpYear.value) == 0 && cardExpMonth.value) {
    cardExpYear.parentElement.classList.add("invalid");
    cardExpMonth.parentElement.classList.remove("invalid");
    datesErrorMsg.textContent = "Invalid year";
  } else if (
    Number(cardExpYear.value) > 1 &&
    Number(cardExpYear.value) < currentYear
  ) {
    cardExpYear.parentElement.classList.add("invalid");
    datesErrorMsg.textContent = "Card has expired";
  } else if (Number(cardExpYear.value) > estimatedExpYear) {
    cardExpYear.parentElement.classList.add("invalid");
    datesErrorMsg.textContent = "Year is too far off..";
  } else if (!Number(cardExpMonth.value) || !Number(cardExpYear.value)) {
    cardExpMonth.parentElement.classList.add("invalid");
    cardExpYear.parentElement.classList.add("invalid");
    datesErrorMsg.textContent = "Wrong format, number only";
  } else {
    cardExpYear.parentElement.classList.remove("invalid");
    cardExpMonth.parentElement.classList.remove("invalid");
    datesErrorMsg.textContent = "";
  }
}

// show error message function
function showErrorMsg(error) {
  // console.log(error.value);
  error.forEach(function (errorMessage) {
    if (!errorMessage.value) {
      errorMessage.parentElement.classList.add("invalid");
      errorMessage.nextElementSibling.textContent = "Can't be blank";
    }
  });
}

// check input validity
function validateInput(input, minLength, numberFormat) {
  if (input.value.length >= 1 && input.value.length < minLength) {
    input.parentElement.classList.add("invalid");
    input.nextElementSibling.textContent = `Must be at least ${minLength} characters`;
  }
  if (numberFormat == true) {
    input.parentElement.classList.add("invalid");
    input.nextElementSibling.textContent = `Wrong format, numbers only`;
  }
}

// checking if form is valid before submiting
function isFormValid(inputs) {
  let formValid = true;
  inputs.forEach(function (inputs) {
    if (inputs.parentElement.classList.contains("invalid")) {
      formValid = false;
    }
  });
  return formValid;
}

// function for form submmition
form.addEventListener("submit", function (e) {
  e.preventDefault();
  inputEventListener(
    [cardHolderName, cardNumber, cardCvc],
    [cardExpMonth, cardExpYear]
  );
  showErrorMsg([cardHolderName, cardNumber, cardCvc]);
  validateDates();

  // validate inputs
  validateInput(cardHolderName, 2);
  validateInput(cardNumber, 16, isNaN(cardNumber.value));
  validateInput(cardCvc, 3, isNaN(cardCvc.value));

  // other conditions
  const nameRegex = /^[a-zA-Z\s\.]*$/;
  if (!cardHolderName.value.match(nameRegex)) {
    cardHolderName.parentElement.classList.add("invalid");
    cardHolderName.nextElementSibling.textContent =
      "Wrong format, letters only";
  }

  // // validate form before submitting
  if (isFormValid(inputs)) {
    form.classList.add("form-submit");
  }
});
