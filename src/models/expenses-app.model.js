import * as fs from "fs";

const loadTransaction = () => {
  const file = fs.readFileSync("dummy/transactions.json", "utf-8");
  const transactions = JSON.parse(file);
  return transactions;
};

const newTransaction = (transactions) => {
  fs.writeFileSync("dummy/transactions.json", JSON.stringify(transactions));
};

const addTransaction = (transaction) => {
  const transactions = loadTransaction();
  transactions.push(transaction);
  newTransaction(transactions);
};

// const updateTransaction = (id, updatedData) => {
//   const transactions = loadTransaction();
//   for (let i = 0; i < transactions.length; i++) {
//     if (transactions[i].id === id) {
//       const updatedTransaction = () => ({ ...transactions[i], ...updatedData });
//       transactions.push(updatedTransaction());
//       delete transactions[i];
//       newTransaction(transactions);
//       return transactions;
//     }
//   }
//   return null;
// };

const updateTransaction = (id, updatedData) => {
  const transactions = loadTransaction();
  transactions = transactions.filter((transaction) => {
    if (transaction.id === id) {
      const updatedTransaction = { ...transaction, ...updatedData };
      // This array is created by filtering out transactions with IDs equal to id and then adding the updatedTransaction object.
      // This effectively updates the transactions array with the new transaction data.
      newTransaction([
        ...transactions.filter((t) => t.id !== id),
        updatedTransaction,
      ]);
      return true;
    }
    return false;
  });
  return transactions.length > 0 ? transactions : null;
};

// const updateTransaction = (id, updatedData) => {
//   const transactions = loadTransaction();

//   const updatedTransactions = transactions.map((transaction) => {
//     if (transaction.id === id) {
//       return { ...transaction, ...updatedData };
//     }
//     return transaction;
//   });
//   newTransaction(updatedTransactions);
//   return updatedTransactions.length > 0 ? updatedTransactions : null;
// };

// const deleteTransaction = (id) => {
//   const transactions = loadTransaction();
//   const deletedTransaction = transactions.find(txn => txn.id === id);

//   if (deletedTransaction) {
//     transactions = transactions.filter((txn) => txn.id !== id);
//     newTransaction(transactions);

//   }
//   return deletedTransaction || null;
// };

const deleteTransaction = (id) => {
  const transactions = loadTransaction();
  const deletedTransaction = transactions.find((txn) => txn.id === id);
  if (deletedTransaction) {
    const filteredTransaction = transactions.filter((txn) => txn.id !== id);
    return newTransaction(filteredTransaction);
  }
  return null;
};

const getIncome = () => {
  const transactions = loadTransaction();
  let totalIncome = 0;
  transactions.forEach((txn) => {
    if (txn.type === "income") {
      totalIncome += txn.amount;
    }
  });
  return totalIncome;
};

const getExpense = () => {
  const transactions = loadTransaction();
  let totalExpense = 0;
  transactions.forEach((txn) => {
    if (txn.type === "expense") {
      totalExpense += txn.amount;
    }
  });
  return totalExpense;
};

const getBalance = () => {
  const transactions = loadTransaction();
  let totalIncome = 0;
  let totalExpense = 0;
  transactions.forEach((txn) => {
    if (txn.type === "income") {
      totalIncome += txn.amount;
    } else if (txn.type === "expense") {
      totalExpense += txn.amount;
    }
  });
  const balance = totalIncome - totalExpense;
  return balance;
};

export {
  loadTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getBalance,
  getExpense,
  getIncome,
};
