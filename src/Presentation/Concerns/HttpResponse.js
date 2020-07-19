const MissingParameterError = require('./Exceptions/MissingParameterError');
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
}

module.exports = HttpResponse;