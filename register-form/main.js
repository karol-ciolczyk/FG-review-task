const form = document.forms[0];
const inputElements = document.forms[0].elements;
const emailInput = document.querySelector(".input-email");

const test = inputElements.namedItem("house");
// console.log(test);
// console.log(form);
// console.log(inputElements);
// console.log(emailInput);

let registrationData = {
  name: "",
  surname: "",
  phone: "",
  street: "",
  house: "",
  city: "",
  email: "",
};

const markEmptyInputs = function (registrationData) {
  const values = Object.values(registrationData);
  const objetcEntr = Object.entries(registrationData);
  const emptyKeys = objetcEntr.filter((array) => array[1] === "");
  emptyKeys.forEach((array) => {
    inputElements.namedItem(`${array[0]}`).classList.add("input--invalid");
  });
  // const isInputEmpty = values.includes("");
  // if (isInputEmpty) alert("fill empty fields");
  // if (!isFormValid) alert("fill empty fields");

  console.log(registrationData);
};

const areInputsCorrect = function (elements) {
  let allClasses = [];
  Array.from(elements).forEach((element) => {
    const newClasses = Array.from(element.classList);
    allClasses = [...allClasses, ...newClasses];
  });

  if (allClasses.includes("input--invalid")) {
    return false;
  } else {
    return true;
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  markEmptyInputs(registrationData);
  const isFormCorrect = areInputsCorrect(inputElements);
  console.log(isFormCorrect);
  if (!isFormCorrect)
    alert("form is incorrect. Fill all fields or correct mistakes");
  if (isFormCorrect) alert(`form is correct`);
});

form.addEventListener("input", (event) => {
  event.preventDefault();
  const targetName = event.target.name;

  if (targetName === "email") {
    console.log("email");
    const isValid = /(\w\.?)+@[\w\.-]+\.\w{2,}/g.test(event.target.value);
    if (!isValid) event.target.classList.add("input--invalid");
    if (isValid) event.target.classList.remove("input--invalid");
  }
  if (targetName === "phone") {
    console.log("phone");

    const isValid = /\(?(\d{3})\)?[-\.\s]?(\d{3})[-\.\s]?(\d{3})/g.test(
      event.target.value
    );
    if (!isValid) event.target.classList.add("input--invalid");
    if (isValid) event.target.classList.remove("input--invalid");
  }
  if (
    targetName === "name" ||
    targetName === "surname" ||
    targetName === "city" ||
    targetName === "street"
  ) {
    const isValid = /^[A-Za-z]+$/g.test(event.target.value);
    if (!isValid) event.target.classList.add("input--invalid");
    if (isValid) event.target.classList.remove("input--invalid");
  }
  if (targetName === "house") {
    let isValid = /^[0-9]*$/g.test(event.target.value);
    isValid = event.target.value === "" ? false : isValid;
    if (!isValid) event.target.classList.add("input--invalid");
    if (isValid) event.target.classList.remove("input--invalid");
  }
  // if (event.target.value === "") {
  //   event.target.classList.remove("input--invalid");
  // }

  registrationData = {
    ...registrationData,
    [event.target.name]: event.target.value,
  };
});
