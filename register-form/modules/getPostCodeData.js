export const getPostCodeData = async function (postCode) {
  const citiesList = document.querySelector("#cities");
  const optionElements = document.querySelectorAll("option");

  if (optionElements.length > 0) {
    optionElements.forEach((el) => el.remove());
  }

  try {
    const response = await fetch(
      `http://kodpocztowy.intami.pl/api/${postCode}`
    );
    const data = await response.json();

    data.forEach((locationDataObject) => {
      const option = document.createElement("option");
      option.value = locationDataObject.ulica
        ? `${locationDataObject.kod} ${locationDataObject.miejscowosc}, ${locationDataObject.ulica}`
        : `${locationDataObject.kod} ${locationDataObject.miejscowosc}`;

      citiesList.append(option);
    });
  } catch (error) {
    alert(`${error}`);
  }
};
