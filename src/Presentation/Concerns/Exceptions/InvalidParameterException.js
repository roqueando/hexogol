class InvalidParameterException extends Error {
  constructor(param) {
    super(`Invalid parameter: ${param}`);
    this.name = 'InvalidParameterException';
  }
}

module.exports = InvalidParameterException;

