const MissingParameterError = require('./Exceptions/MissingParameterError');
const UnauthorizedException = require('./Exceptions/UnauthorizedException');
class HttpResponse {
  static badRequest(param) {
    return {
      statusCode: 400,
      body: new MissingParameterError(param)
    }
  }

  static internalError() {
    return {
      statusCode: 500
    }
  }
  static unauthorized() {
    return {
      statusCode: 401,
      body: new UnauthorizedException
    }
  }
}

module.exports = HttpResponse;