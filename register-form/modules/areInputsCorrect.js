export const areInputsCorrect = function (elements) {
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
