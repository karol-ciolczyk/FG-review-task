const form = document.forms[0];
const inputElements = document.forms[0].elements;
const emailInput = document.querySelector(".input-email");
const post = document.querySelector("#post");

post.addEventListener("change", (event) => {
  const addressDataArray = event.target.value.replace(" ", ",").split(",");
  console.log(event.target.value.replace(" ", ",").split(","));
  event.target.value = addressDataArray[0];
  event.target.classList.remove("input--invalid");
});

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

const getPostCodeData = async function (postCode) {
  const citiesList = document.querySelector("#cities");

  // if(postCode.lengt)
  // console.log(postCode);

  try {
    const response = await fetch(
      `http://kodpocztowy.intami.pl/api/${postCode}`
    );
    const data = await response.json();
    console.log(data);

    data.forEach((locationDataObject) => {
      const option = document.createElement("option");
      option.value = locationDataObject.ulica
        ? `${locationDataObject.kod} ${locationDataObject.miejscowosc}, ${locationDataObject.ulica}`
        : `${locationDataObject.kod} ${locationDataObject.miejscowosc}`;

      console.log(option);
      citiesList.append(option);
    });
  } catch (error) {
    alert(`${error}`);
  }
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
    const isValid = /^[a-zA-Z\s]*$/g.test(event.target.value);
    if (!isValid) event.target.classList.add("input--invalid");
    if (isValid) event.target.classList.remove("input--invalid");
  }
  if (targetName === "house") {
    let isValid = /^[0-9]*$/g.test(event.target.value);
    isValid = event.target.value === "" ? false : isValid;
    if (!isValid) event.target.classList.add("input--invalid");
    if (isValid) event.target.classList.remove("input--invalid");
  }
  if (targetName === "post") {
    // console.log(event.target.value);

    const isValid = /^[0-9]{2}-[0-9]{3}$/g.test(event.target.value);
    // console.log(isValid);
    if (!isValid) event.target.classList.add("input--invalid");
    if (isValid) {
      event.target.classList.remove("input--invalid");
      getPostCodeData(event.target.value);
    }
  }

  registrationData = {
    ...registrationData,
    [event.target.name]: event.target.value,
  };
});
