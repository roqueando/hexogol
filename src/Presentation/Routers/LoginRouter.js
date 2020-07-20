const HttpResponse = require('../Concerns/HttpResponse');
const MissingParameterError = require('../Concerns/Exceptions/MissingParameterError');
const InvalidParameterException = require('../Concerns/Exceptions/InvalidParameterException');
class LoginRouter {
  constructor(authUseCase) {
    this.authUseCase = authUseCase;
    //TODO: put email validator here
  }
  async route(httpRequest) {
    try {
      const { email, password } = httpRequest.body;
      if (!email) {
        return HttpResponse.badRequest(new MissingParameterError('email'));
      }
      if (!password) {
        return HttpResponse.badRequest(new MissingParameterError('password'));
      }

      const token = await this.authUseCase.auth(email, password);
      if (!token) {
        return HttpResponse.unauthorized();
      }
      return HttpResponse.success({ token })
    } catch (error) {
      return HttpResponse.internalError();
    }
  }
}

module.exports = LoginRouter;