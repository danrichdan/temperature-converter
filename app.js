// Define the UI Vars
const tempForm = document.getElementById("temperature-form");
const convertedTemperatureInput = document.getElementById("new-temp");
const newUnit = document.getElementById("new-unit");
const summary = document.getElementById("summary");

// Add Event Listener/s
tempForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const initialTemp = +document.getElementById("temperature").value;
  const initialUnit = document.getElementById("unit").value;
  const convertToUnit = document.getElementById("convert-to-unit").value;
  const newTemp = convertTemp(initialTemp, initialUnit, convertToUnit);
  summary.innerHTML = `${initialTemp}<sup>o</sup>${initialUnit
    .charAt("0")
    .toUpperCase()}${initialUnit.substr(1, initialUnit.length)} =`;
  convertedTemperatureInput.value = `${newTemp}`;
  newUnit.innerHTML = `<sup>o</sup>${convertToUnit
    .charAt("0")
    .toUpperCase()}${convertToUnit.substr(1, convertToUnit.length)}`;
});

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
  } else {
    console.log("Wrong Units");
  }
  return newTemp;
}

// Display Loading Gif

// Form Validation
// Empty Fields
// Unselected options
// Trying to convert to the Same Unit

// Tidy it up, maybe deal with the decimal points
