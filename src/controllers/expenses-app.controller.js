import {
  loadTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getBalance,
  getExpense,
  getIncome,
} from "../models/expenses-app.model.js";
import { responseOk, responseError } from "../utils/restResp.helper.js";

const getAllTxn = function getAllTxn(req, res) {
  const transaction = loadTransaction();
  return res.json(transaction);
};

const addTxn = function addTxn(req, res) {
  addTransaction(req.body);
  return res.status(201).json({ Created: "Successfully" });
};

// const updateTxn = function updateTxn(req, res) {
//   const id = req.params["id"];
//   const body = req.body;

//   updateTransaction(id, body.date, body.type, body.amount, body.details);
//   return res.status(204).json({ Updated: "Successfully" });
// };

const updateTxn = function updateTxn(req, res) {
  // const id = req.params["id"];
  const id = req.params.id;
  const body = req.body;
  const updated = updateTransaction(id, body);
  if (updated) {
    return res.status(200).json({
      message: "Transaction updated successfully",
      updated: updated,
    });
  }
};

const deleteTxn = function deletedTxn(req, res) {
  const id = req.params.id;
  const deleted = deleteTransaction(id);
  return res.status(200).json({
    message: "Transaction deleted successfully",
  });
};

const totalBalance = function totalExpense(req, res) {
  const balance = getBalance();
  return res.json({ total: balance });
};

const totalExpense = function totalExpense(req, res) {
  const tExpense = getExpense();
  return res.json({ totalExpense: tExpense });
};

const totalIncome = function totalIncome(req, res) {
  const tIncome = getIncome();
  return res.json({ totalExpense: tIncome });
};

export {
  getAllTxn,
  addTxn,
  updateTxn,
  deleteTxn,
  totalBalance,
  totalExpense,
  totalIncome,
};
