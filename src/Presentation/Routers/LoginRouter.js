const HttpResponse = require('../Concerns/HttpResponse');
class LoginRouter {
  constructor(authUseCase) {
    this.authUseCase = authUseCase;
  }
  route(httpRequest) {
    if (!httpRequest
      || !httpRequest.body
      || !this.authUseCase
      || !this.authUseCase.auth
    ) {
      return HttpResponse.internalError();
    }
    const { email, password } = httpRequest.body;
    if (!email) {
      return HttpResponse.badRequest('email');
    }
    if (!password) {
      return HttpResponse.badRequest('password');
    }

    this.authUseCase.auth(email, password);
    return HttpResponse.unauthorized();
  }
}

module.exports = LoginRouter;