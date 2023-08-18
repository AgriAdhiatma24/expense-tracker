import express from "express";
import {
  getAllTxn,
  addTxn,
  updateTxn,
  deleteTxn,
  totalBalance,
  totalExpense,
  totalIncome,
} from "../controllers/expenses-app.controller.js";
import { API_PATH } from "../utils/constants.js";

const appView = express();
const TRANSACTION_PATH_V1 = `${API_PATH}/v1/transaction`;

appView.get(`${TRANSACTION_PATH_V1}/transactions`, getAllTxn);
appView.post(`${TRANSACTION_PATH_V1}/transactions`, addTxn);
appView.put(`${TRANSACTION_PATH_V1}/transactions/:id`, updateTxn);
appView.delete(`${TRANSACTION_PATH_V1}/transactions/:id`, deleteTxn);

appView.get(`${TRANSACTION_PATH_V1}/transactions/balance`, totalBalance);
appView.get(`${TRANSACTION_PATH_V1}/transactions/income`, totalIncome);
appView.get(`${TRANSACTION_PATH_V1}/transactions/expense`, totalExpense);

export { appView };
