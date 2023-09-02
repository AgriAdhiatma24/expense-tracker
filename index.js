const express = require("express");
const { PORT } = require("./src/utils/constants.js");
const appView = require("./src/views/expenses-app.view.js");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
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
  res.json({ error: "ERROR" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
