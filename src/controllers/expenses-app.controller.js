const {
  loadTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getBalance,
  getExpense,
  getIncome,
} = require("../models/expenses-app.model.js");

const helper = require("../utils/restResp.helper.js");

getAllTxn = async (req, res) => {
  try {
    const transactions = await loadTransaction();
    return res
      .status(200)
      .json(
        helper.responseOk("Successfuly fetching all transactions", transactions)
      );
  } catch (e) {
    console.error("Error fetching transactions: ", e);
    return res.status(500).json(helper.responseError(e));
  }
};

addTxn = async (req, res) => {
  try {
    await addTransaction(req.body);
    return res.status(201).json(helper.responseOk("Created Successfuly"));
  } catch (e) {
    console.error("Error creating transaction: ", e);
    return res.status(500).json(helper.responseError(e));
  }
};

updateTxn = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const updated = await updateTransaction(id, body);
    return res
      .status(200)
      .json(helper.responseOk("Transaction updated successfully", updated));
  } catch (e) {
    console.error("Error updating transaction: ", e);
    return res.status(500).json(helper.responseError(e));
  }
};

const deleteTxn = async (req, res) => {
  const id = req.params.id;
  try {
    await deleteTransaction(id);
    return res
      .status(200)
      .json(helper.responseOk("Transaction deleted successfully"));
  } catch (e) {
    console.error("Error deleting transaction: ", e);
    return res.status(500).json(helper.responseError(e));
  }
};

const totalBalance = async (req, res) => {
  try {
    const balance = await getBalance();
    return res.status(200).json(helper.responseOk("Total Balance", balance));
  } catch (e) {
    console.error("Cannot get total balance: ", e);
    return res.status(500).json(helper.responseError(e));
  }
};

const totalExpense = async (req, res) => {
  try {
    const tExpense = await getExpense();
    return res.status(200).json(helper.responseOk("Total Expense", tExpense));
  } catch (e) {
    console.error("Cannot get total expense: ", e);
    return res.status(500).json(helper.responseError(e));
  }
};

const totalIncome = async (req, res) => {
  try {
    const tIncome = await getIncome();
    return res.status(200).json(helper.responseOk("Total Income", tIncome));
  } catch (e) {
    console.error("Cannot get total income: ", e);
    return res.status(500).json(helper.responseError(e));
  }
};

module.exports = {
  getAllTxn,
  addTxn,
  updateTxn,
  deleteTxn,
  totalBalance,
  totalExpense,
  totalIncome,
};
