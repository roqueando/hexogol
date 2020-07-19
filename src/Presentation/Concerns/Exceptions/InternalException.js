class InternalException extends Error {
  constructor() {
    super(`Internal Server Error, please try again later`);
    this.name = 'InternalException';
  }
}

module.exports = InternalException;
