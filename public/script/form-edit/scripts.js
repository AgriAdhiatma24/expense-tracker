const urlParams = new URLSearchParams(window.location.search);
const transactionId = urlParams.get("id");
const submitButton = document.getElementById("submit");

// Format Date
// formatDateEl = (date) => {
//   const newDate = new Date(date);
//   if (isNaN(newDate.getTime())) {
//     return "Invalid Date";
//   }

//   // Get day, month, and year components from the date object
//   const day = String(newDate.getDate()).padStart(2, "0");
//   const month = String(newDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
//   const year = newDate.getFullYear();
//   // Create the formatted date string in MM/DD/YYYY format
//   const formattedDate = `${year}-${month}-${day}`;
//   return formattedDate;
// };

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
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

const transactionResp = async () => {
  const txnResp = await fetch(
    `http://localhost:9000/api/v1/transaction/transaction/${transactionId}`
  );
  const jsonResp = await txnResp.json();
  const oneTransaction = jsonResp.data;
  console.log(oneTransaction.date);
  // document.getElementById("dateInput").value = formatDateEl(
  //   oneTransaction.date
  // );
  document.getElementById("dateInput").value = oneTransaction.date;
  document.getElementById("typeSelect").value = oneTransaction.type;
  document.getElementById("amountInput").value = oneTransaction.amount;
  document.getElementById("field5").value = oneTransaction.description;
};

const editForm = async (e) => {
  let isValid = true;
  const requiredInput = form.querySelectorAll("[required]");
  const errorMessage = form.querySelectorAll(".error-message");

  requiredInput.forEach((input, idx) => {
    if (!input.value) {
      isValid = false;
      // errorMessage[idx].style.display = "block";
    } else {
      // errorMessage[idx].style.display = "none";
    }
  });
  if (isValid) {
    e.preventDefault();
  }

  // Form Handling
  const dateInput = document.getElementById("dateInput");
  const typeSelect = document.getElementById("typeSelect");
  const amountInput = document.getElementById("amountInput");
  const textArea = document.getElementById("field5");

  const date = dateInput.value;
  const type = typeSelect.value;
  const amount = parseInt(amountInput.value);
  const description = () => {
    if (textArea.value === "") {
      return null;
    }
    return textArea.value;
  };
  const desc = description();

  const transactionData = JSON.stringify({
    date,
    type,
    amount,
    description: desc,
  });

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: transactionData,
  };
  // fetch(
  //   `http://localhost:9000/api/v1/transaction/transactions/${transactionId}`,
  //   requestOptions
  // )
  //   .then((response) => response.text())
  //   .then((result) => {
  //     console.log(result);
  //     window.location.href = "index.html";
  //   })
  //   .catch((error) => console.log("error", error));
  const submitFormRes = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/transaction/transactions/${transactionId}`,
        requestOptions
      );
      const jsonResp = await response.json();
      console.log(jsonResp);
      if (response.status === 200) {
        window.location.href = "index.html";
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };
  submitFormRes();
};
submitButton.addEventListener("click", editForm);

// Handle Cancel Button
const cancelBtn = document
  .getElementById("form")
  .querySelector("#cancel-button");
cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "./index.html";
});
