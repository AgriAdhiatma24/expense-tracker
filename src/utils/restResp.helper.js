responseOk = (msg, data) => {
  return {
    message: msg,
    data,
  };
};

responseError = (err) => {
  return {
    error: err,
  };
};

module.exports = { responseError, responseOk };
