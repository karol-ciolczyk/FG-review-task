export const autoFill = function (event, registrationData) {
  const city = document.querySelector("#city");
  const street = document.querySelector("#street");

  const inputValue = event.target.value;
  const input = event.target;
  const addressDataArray = inputValue
    .replace(" ", ",")
    .split(",")
    .map((el) => el.trim());
  event.target.value = addressDataArray[0];
  input.classList.remove("input--invalid");

  city.value = addressDataArray[1];
  if (addressDataArray[2]) {
    street.value = addressDataArray[2];
    street.dispatchEvent(new Event("change"));
  } else {
    street.value = "";
  }

  return {
    ...registrationData,
    city: city.value,
    street: street.value,
  };
};
