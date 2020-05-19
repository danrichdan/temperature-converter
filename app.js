// Define the UI Vars
const tempForm = document.getElementById("temperature-form");
const convertedTemperatureInput = document.getElementById("new-temp");
const newUnit = document.getElementById("new-unit");
const summary = document.getElementById("summary");

// Add Event Listener
tempForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const initialTemp = +document.getElementById("temperature").value;
  const initialUnit = document.getElementById("unit").value;
  const convertToUnit = document.getElementById("convert-to-unit").value;
  const errors = formValidation(initialTemp, initialUnit, convertToUnit);
  // Perform Field Validation
  if (errors) {
    displayErrorMessages(errors);
    setTimeout(function () {
      clearErrors();
    }, 3000);
  } else {
    // Hide Results
    document.getElementById("results").style.display = "none";
    // Show Loader
    document.getElementById("loading").style.display = "block";
    convertTemperature(initialTemp, initialUnit, convertToUnit);
  }
});

// Function for converting temp
function convertTemperature(initialTemp, initialUnit, convertToUnit) {
  setTimeout(function () {
    // Show Results
    document.getElementById("results").style.display = "block";
    // Hide Loader
    document.getElementById("loading").style.display = "none";
  }, 3000);
  const newTemp = convertTemp(initialTemp, initialUnit, convertToUnit);
  summary.innerHTML = `${initialTemp}<sup>o</sup>${initialUnit
    .charAt("0")
    .toUpperCase()}${initialUnit.substr(1, initialUnit.length)} =`;
  convertedTemperatureInput.value = `${newTemp}`;
  newUnit.innerHTML = `<sup>o</sup>${convertToUnit
    .charAt("0")
    .toUpperCase()}${convertToUnit.substr(1, convertToUnit.length)}`;
}

// Conversion functions
// Fahrenheit to Celsius
function convertFahrenheitToCelsius(temp) {
  return ((temp - 32) * 5) / 9;
}
// Fahrenheit to Kelvin
function convertFahrenheitToKelvin(temp) {
  return ((temp - 32) * 5) / 9 + 273.15;
}
// Celsius to Fahrenheit
function convertCelsiusToFahrenheit(temp) {
  return (temp * 9) / 5 + 32;
}
// Celsius to Kelvin
function convertCelsiusToKelvin(temp) {
  return (temp + 273.15).toFixed(2);
}
// Kelvin to Fahrenheit
function convertKelvinToFahrenheit(temp) {
  return (((temp - 273.15) * 9) / 5 + 32).toFixed(2);
}
// Kelvin to Celsius
function convertKelvinToCelsius(temp) {
  return (temp - 273.15).toFixed(2);
}
// The logic for when to call each conversion function
function convertTemp(temperature, unit, convertToUnit) {
  let newTemp;
  if (unit === "fahrenheit" && convertToUnit === "celsius") {
    newTemp = convertFahrenheitToCelsius(temperature);
  } else if (unit === "fahrenheit" && convertToUnit === "kelvin") {
    newTemp = convertFahrenheitToKelvin(temperature);
  } else if (unit === "celsius" && convertToUnit === "fahrenheit") {
    newTemp = convertCelsiusToFahrenheit(temperature);
  } else if (unit === "celsius" && convertToUnit === "kelvin") {
    newTemp = convertCelsiusToKelvin(temperature);
  } else if (unit === "kelvin" && convertToUnit === "fahrenheit") {
    newTemp = convertKelvinToFahrenheit(temperature);
  } else if (unit === "kelvin" && convertToUnit === "celsius") {
    newTemp = convertKelvinToCelsius(temperature);
  }
  return newTemp;
}

// Form Validation logic
function formValidation(initialTemp, initialUnit, convertToUnit) {
  let errorMessages = [];
  if (initialUnit == convertToUnit) {
    const sameUnitsMsg =
      "Please select a new Unit to convert to, or change the original temperature's unit.";
    errorMessages.push(sameUnitsMsg);
  }
  if (
    initialUnit.includes("Choose...") ||
    convertToUnit.includes("Convert to...")
  ) {
    const unselectedOptionsMsg = "Please select a unit of temperature.";
    errorMessages.push(unselectedOptionsMsg);
  }
  if (errorMessages.length > 0) {
    return errorMessages;
  } else {
    return false;
  }
}

// Display the Error Messages found in form validation
function displayErrorMessages(errorMessages) {
  document.getElementById("results").style.display = "none";
  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";

  errorMessages.forEach(function (error) {
    let newSpan = document.createElement("span");
    newSpan.className = "d-flex flex-column";
    newSpan.textContent = error;
    errorDiv.appendChild(newSpan);
  });

  const cardHeader = document.querySelector(".card-header");
  const heading = document.querySelector(".heading");

  cardHeader.insertBefore(errorDiv, heading);
}

// Clear the error messages
function clearErrors() {
  document.querySelector(".alert").remove();
}
