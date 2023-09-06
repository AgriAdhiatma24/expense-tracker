// Form Handling
const dateInput = document.getElementById("dateInput");
const typeSelect = document.getElementById("typeSelect");
const amountInput = document.getElementById("amountInput");
const textArea = document.getElementById("field5");
const submitButton = document.getElementById("submit");
const cancelButton = document.getElementById("cancel-button");

// Function to handle form submission
handleSubmit = async (e) => {
  let isValid = true;
  const requiredInput = form.querySelectorAll("[required]");

  requiredInput.forEach((input, idx) => {
    if (!input.value) {
      isValid = false;
    }
  });
  if (isValid) {
    e.preventDefault();
  }

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
    method: "POST",
    headers: myHeaders,
    body: transactionData,
  };

  const submitFormRes = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/v1/transaction/transactions",
        requestOptions
      );
      const jsonResp = await response.json();
      console.log(jsonResp);
      if (response.status === 201) {
        window.location.href = "index.html";
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };
  submitFormRes();
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
