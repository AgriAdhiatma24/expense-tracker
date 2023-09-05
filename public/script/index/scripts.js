// Fetching All Transactions
const tableWrapper = document.getElementById("table-body");
const showPage = async () => {
  //Get All Transaction
  const getTransactionResponse = await fetch(
    "http://localhost:9000/api/v1/transaction/transactions"
  );
  const jsonResp = await getTransactionResponse.json();
  const transaction = jsonResp.data;
  tableWrapper.innerHTML = "";
  transaction.forEach((txn, idx) => {
    const tableInfo = tableGenerator(
      txn.id,
      idx + 1,
      txn.date,
      txn.amount,
      txn.type,
      txn.description
    );

    tableWrapper.innerHTML += tableInfo;
  });

  // Handle Delete Button
  const deleteButton = document
    .getElementById("table-body")
    .querySelectorAll("#delete");

  deleteButton.forEach((d) => {
    d.addEventListener("click", async (e) => {
      e.preventDefault();
      const transactionId = d.getAttribute("data-transaction-id");
      const isConfirmed = window.confirm("Are you sure want to delete this?");

      if (isConfirmed) {
        try {
          const deleteResp = await fetch(
            `http://localhost:9000/api/v1/transaction/transactions/${transactionId}`,
            {
              method: "DELETE",
            }
          );
          window.location.reload();
        } catch (e) {
          console.log("Error Occured : ", e);
        }
      }
    });
  });
};

const tableGenerator = (id, no, date, amount, type, description) => `
<tr>
    <td>${no}</td>
     <td>${date}</td>
     <td>${amount}</td>
     <td>${type}</td>
     <td>${description}</td>
     <td><a href="form-edit.html?id=${id}" class="edit" id="edit"
     ><span class="material-symbols-outlined"> edit </span>
     </a>
     <a href="" class="delete" id="delete" data-transaction-id="${id}"
     ><span class="material-symbols-outlined"> delete </span>
     </a></td>
   </tr>`;

// Currency Formatter
const currencyFormatter = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};
// Fetching Insight Balance
const balanceWrapper = document.getElementById("info-balance");
const getBalance = async () => {
  const resp = await fetch(
    "http://localhost:9000/api/v1/transaction/transactions/balance"
  );
  const jsonResp = await resp.json();
  const balance = jsonResp.data;
  balanceWrapper.innerHTML = "";
  balanceInfo = balanceGenerator(balance);
  balanceWrapper.innerHTML = balanceInfo;
};

const balanceGenerator = (balance) => `
<h3>Total Balance</h3>
<h1>${currencyFormatter(balance)}</h1>
`;

// Fetching Insight Income
const incomeWrapper = document.getElementById("info-income");
const getIncome = async () => {
  const resp = await fetch(
    "http://localhost:9000/api/v1/transaction/transactions/income"
  );
  const jsonResp = await resp.json();
  const income = jsonResp.data;
  incomeWrapper.innerHTML = "";
  incomeInfo = incomeGenerator(income);
  incomeWrapper.innerHTML = incomeInfo;
};

const incomeGenerator = (income) => `
  <h3>Total Income</h3>
  <h1>${currencyFormatter(income)}</h1>
`;

// Fetching Insight Expenses
const expenseWrapper = document.getElementById("info-expenses");
const getExpenses = async () => {
  const resp = await fetch(
    "http://localhost:9000/api/v1/transaction/transactions/expense"
  );
  const jsonResp = await resp.json();
  const expense = jsonResp.data;
  expenseWrapper.innerHTML = "";
  expenseInfo = expenseGenerator(expense);
  expenseWrapper.innerHTML = expenseInfo;
};

const expenseGenerator = (expense) => `
  <h3>Total Expense</h3>
  <h1>${currencyFormatter(expense)}</h1>`;
