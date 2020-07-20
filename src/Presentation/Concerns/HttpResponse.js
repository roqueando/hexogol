const MissingParameterError = require('./Exceptions/MissingParameterError');
const UnauthorizedException = require('./Exceptions/UnauthorizedException');
const InternalException = require('./Exceptions/InternalException');
const InvalidParameterException = require('./Exceptions/InvalidParameterException');
class HttpResponse {
  static badRequest(error) {
    return {
      statusCode: 400,
      body: error
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