import express from "express";
import { PORT } from "./src/utils/constants.js";
import { appView } from "./src/views/expenses-app.view.js";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
// app.use(bodyParser({ extended: false }));
app.use(appView);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.json({error: "ERROR"});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
