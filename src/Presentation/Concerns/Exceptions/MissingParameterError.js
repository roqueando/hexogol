class MissingParameterError extends Error {
  constructor(param) {
    super(`Missing parameter ${param}`);
    this.name = 'MissingParameterError';
  }
}

module.exports = MissingParameterError;