import { markEmptyInputs } from "./modules/markEmptyInputs.js";
import { areInputsCorrect } from "./modules/areInputsCorrect.js";
import { autoFill } from "./modules/autoFill.js";
import { validateInputData } from "./modules/validateInputData.js";

// const test = inputElements.namedItem("house");
const form = document.forms[0];
const inputElements = document.forms[0].elements;
const post = document.querySelector("#post");

let registrationData = {
  name: "",
  surname: "",
  phone: "",
  street: "",
  house: "",
  city: "",
  email: "",
  post: "",
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  markEmptyInputs(registrationData);
  const isFormCorrect = areInputsCorrect(inputElements);
  console.log(isFormCorrect);
  if (!isFormCorrect)
    alert("form is incorrect. Fill all fields or correct mistakes");
  if (isFormCorrect) {
    form.reset();
    alert(`form is correct`);
  }
});

form.addEventListener("input", (event) => {
  event.preventDefault();

  const newData = validateInputData(event);
  registrationData = {
    ...registrationData,
    ...newData,
  };
});

post.addEventListener("change", (event) => {
  const newData = autoFill(event, registrationData);
  registrationData = {
    ...registrationData,
    ...newData,
  };
});
