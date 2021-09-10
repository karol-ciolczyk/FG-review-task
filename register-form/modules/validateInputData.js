import { getPostCodeData } from "./getPostCodeData.js";

export const validateInputData = function (event) {
  let registrationData = {};
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
    let isValid = /^[a-zA-Z-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s]*$/g.test(event.target.value);
    isValid = event.target.value === "" ? false : isValid;
    if (!isValid) event.target.classList.add("input--invalid");
    if (isValid) event.target.classList.remove("input--invalid");
  }
  if (targetName === "house" || targetName === "apartment") {
    let isValid = /^[0-9]*$/g.test(event.target.value);
    isValid =
      event.target.value === ""
        ? targetName === "house"
          ? false
          : true
        : isValid;
    if (!isValid) event.target.classList.add("input--invalid");
    if (isValid) event.target.classList.remove("input--invalid");
  }
  if (targetName === "post") {
    const isValid = /^[0-9]{2}-[0-9]{3}$/g.test(event.target.value);
    if (!isValid) event.target.classList.add("input--invalid");
    if (isValid) {
      event.target.classList.remove("input--invalid");
      getPostCodeData(event.target.value);
    }
  }

  return {
    ...registrationData,
    [event.target.name]: event.target.value,
  };
};
