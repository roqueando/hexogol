class UnauthorizedException extends Error {
  constructor() {
    super(`Unauthorized authentication`);
    this.name = 'UnauthorizedException';
  }
}

module.exports = UnauthorizedException;