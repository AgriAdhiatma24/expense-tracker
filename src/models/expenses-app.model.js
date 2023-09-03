const db = require("../db/db.config");

const loadTransaction = async () => {
  return await db.select("*").from("transactions");
};

const newTransaction = async (transactions) => {
  return await db("transactions").insert(transactions);
};

const addTransaction = async (transaction) => {
  const transactions = loadTransaction();
  await newTransaction(transaction);
};

const updateTransaction = async (id, updatedData) => {
  await db("transactions").where("id", id).update(updatedData);
};

const deleteTransaction = async (id) => {
  const transactions = loadTransaction();
  await db("transactions").where("id", id).del();
};

const getIncome = async () => {
  const transactions = await loadTransaction();
  let totalIncome = 0;
  transactions.forEach((txn) => {
    if (txn.type === "income" || txn.type === "Income") {
      totalIncome += txn.amount;
    }
  });
  return totalIncome;
};

const getExpense = async () => {
  const transactions = await loadTransaction();
  let totalExpense = 0;
  transactions.forEach((txn) => {
    if (txn.type === "expense" || txn.type === "Expense") {
      totalExpense += txn.amount;
    }
  });
  return totalExpense;
};

const getBalance = async () => {
  const transactions = await loadTransaction();
  let totalIncome = 0;
  let totalExpense = 0;
  transactions.forEach((txn) => {
    if (txn.type === "income" || txn.type === "Income") {
      totalIncome += txn.amount;
    } else if (txn.type === "expense" || txn.type === "Expense") {
      totalExpense += txn.amount;
    }
  });
  const balance = totalIncome - totalExpense;
  return balance;
};

module.exports = {
  loadTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getBalance,
  getExpense,
  getIncome,
};
