const MissingParameterError = require('./Exceptions/MissingParameterError');
const UnauthorizedException = require('./Exceptions/UnauthorizedException');
const InternalException = require('./Exceptions/InternalException');
class HttpResponse {
  static badRequest(param) {
    return {
      statusCode: 400,
      body: new MissingParameterError(param)
    }
  }

  static internalError() {
    return {
      statusCode: 500,
      body: new InternalException
    }
  }
  static unauthorized() {
    return {
      statusCode: 401,
      body: new UnauthorizedException
    }
  }

  static success(data) {
    return {
      statusCode: 200,
      body: data
    }
  }
}

module.exports = HttpResponse;