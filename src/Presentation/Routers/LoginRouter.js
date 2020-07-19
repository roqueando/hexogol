const HttpResponse = require('../Concerns/HttpResponse');
class LoginRouter {
  constructor(authUseCase) {
    this.authUseCase = authUseCase;
  }
  route(httpRequest) {
    try {
      const { email, password } = httpRequest.body;
      if (!email) {
        return HttpResponse.badRequest('email');
      }
      if (!password) {
        return HttpResponse.badRequest('password');
      }

      const token = this.authUseCase.auth(email, password);
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