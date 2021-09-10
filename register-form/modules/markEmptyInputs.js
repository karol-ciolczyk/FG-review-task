const inputElements = document.forms[0].elements;

export const markEmptyInputs = function (registrationData) {
  const values = Object.values(registrationData);
  const objetcEntr = Object.entries(registrationData);
  const emptyKeys = objetcEntr.filter((array) => array[1] === "");
  emptyKeys.forEach((array) => {
    inputElements.namedItem(`${array[0]}`).classList.add("input--invalid");
  });
};
