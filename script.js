// Selecting all dropdowns with class 'dropdown select'
const dropdown = document.querySelectorAll(".dropdown select");

// Selecting the submit button within a form
const BTN = document.querySelector("from button");

// Selecting specific dropdowns by ID
const frmCurr = document.querySelector("#fromselect");
const tocurr = document.querySelector("#Toselect");

// Looping through countryList object keys
for (code in countryList) {
  // Uncommented console log to print code and corresponding value
  // console.log(code, countryList[code]);
}

// Looping through each dropdown select element
for (let select of dropdown) {
  // Looping through countryList object keys again
  for (currcode in countryList) {
    // Uncommented console log to print code and corresponding value
    // console.log(code, countryList[code]);

    // Creating a new option element
    let opt = document.createElement("option");
    opt.innerText = currcode; // Setting option text
    opt.value = currcode; // Setting option value

    // Setting default selected option based on conditions
    if (select.name === "from" && currcode === "USA") {
      opt.selected = true;
    } else if (select.name === "to" && currcode === "PkR") {
      opt.selected = false;
    }

    // Appending option to select element
    select.append(opt);

    // Adding change event listener to each select element
    select.addEventListener("change", (evt) => {
      UpdateFlage(evt.target); // Calling UpdateFlage function on change event
    });
  }
}

// Function to update flag image based on selected currency
const UpdateFlage = (element) => {
  let currcode = element.value;
  let countryCode = countryList[currcode];
  let FlagApi = `https://flagsapi.com/${countryCode}/flat/64.png`;

  // Updating flag image src attribute
  let img = element.parentElement.querySelector("img");
  img.src = FlagApi;
};

// Adding click event listener to submit button
BTN.addEventListener("click", (evt) => {
  evt.preventDefault();

  // Getting input field value for amount
  let amount = document.querySelector("#amount");
  let amountValue = amount.value;

  // Validation for amount greater than zero
  if (amountValue == "0" || amountValue == 0) {
    alert("Please enter an amount greater than zero!");
  }

  // Fetching exchange rates from API based on selected currencies
  let url = `https://v6.exchangerate-api.com/v6/bbf95054d4f767f9570419fc/latest/${frmCurr.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let exChangerate = data.conversion_rates[tocurr.value];
      let totalExchangerate = (amountValue * exChangerate).toFixed(2);

      // Displaying conversion result
      const result = document.querySelector(".result");
      result.innerText = `${amountValue}${frmCurr.value} = ${totalExchangerate}${tocurr.value}`;
    });
});

