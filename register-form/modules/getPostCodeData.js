export const getPostCodeData = async function (postCode) {
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
