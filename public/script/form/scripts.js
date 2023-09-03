// Form Handling
const dateInput = document.getElementById("dateInput");
const typeSelect = document.getElementById("typeSelect");
const amountInput = document.getElementById("amountInput");
const textArea = document.getElementById("field5");
const submitButton = document.getElementById("submit");
const cancelButton = document.getElementById("cancel-button");

// Format Date
formatDate = (date) => {
  const newDate = new Date(date);
  if (isNaN(newDate.getTime())) {
    return "Invalid Date";
  }

  // Get day, month, and year components from the date object
  const day = String(newDate.getDate()).padStart(2, "0");
  const month = String(newDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  const year = newDate.getFullYear();
  // Create the formatted date string in MM/DD/YYYY format
  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
};

// Function to handle form submission
handleSubmit = async (e) => {
  // e.preventDefault();
  let isValid = true;
  const requiredInput = form.querySelectorAll("[required]");
  const errorMessage = form.querySelectorAll(".error-message");

  requiredInput.forEach((input, idx) => {
    if (!input.value) {
      isValid = false;
      errorMessage[idx].style.display = "block";
    } else {
      errorMessage[idx].style.display = "none";
    }
  });
  isValid = true;
  if (isValid) {
    e.preventDefault();
  }

  // Retrieve values from form elements
  const date = formatDate(dateInput.value);
  const type = typeSelect.value.toLowerCase();
  const amount = parseInt(amountInput.value);
  const description = textArea.value;

  const transactionData = JSON.stringify({
    date,
    type,
    amount,
    description,
  });

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: transactionData,
  };

  fetch("http://localhost:9000/api/v1/transaction/transactions", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      window.location.href = "index.html";
    })
    .catch((error) => console.log("error", error));
};
submitButton.addEventListener("click", handleSubmit);

// Handle Cancel Button
const cancelBtn = document
  .getElementById("form")
  .querySelector("#cancel-button");
cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "./index.html";
});

// Handle Empty Form
// const form = document.getElementById("form");
// form.addEventListener("submit", (e) => {
//   let isValid = true;
//   const requiredInput = form.querySelectorAll("[required]");
//   console.log(requiredInput);
//   const errorMessage = form.querySelectorAll(".error-message");
//   console.log(errorMessage);

//   requiredInput.forEach((input, idx) => {
//     if (!input.value) {
//       isValid = false;
//       errorMessage[idx].style.display = "block";
//     } else {
//       errorMessage[idx].style.display = "none";
//     }
//   });
//   if (isValid) {
//     e.preventDefault();
//   }
// });
