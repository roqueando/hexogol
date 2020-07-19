const LoginRouter = require('./LoginRouter');
const MissingParameterError = require('../Concerns/Exceptions/MissingParameterError');
const UnauthorizedError = require('../Concerns/Exceptions/UnauthorizedException');
const InternalException = require('../Concerns/Exceptions/InternalException');

const makeSUT = () => {
  class AuthUseCaseSpy {
    auth(email, password) {
      this.email = email;
      this.password = password;
      return this.token;
    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy();
  return {
    sut: new LoginRouter(authUseCaseSpy),
    authUseCaseSpy
  }
}
describe('login router', () => {
  test('should return 400 if no email provided', () => {
    const { sut } = makeSUT();
    const httpRequest = {
      body: {
        password: 'any'
      }
    }
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParameterError('email'));
  });
  test('should return 400 if no password provided', () => {
    const { sut } = makeSUT();
    const httpRequest = {
      body: {
        email: 'test@email.com'
      }
    }
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
  test('should return 500 if no httpRequest object is provided', () => {
    const { sut } = makeSUT();
    const { statusCode, body } = sut.route();
    expect(statusCode).toBe(500);
    expect(body).toEqual(new InternalException);
  });
  test('should return 500 if httpRequest object has no body', () => {
    const { sut } = makeSUT();
    const { statusCode, body } = sut.route({});
    expect(statusCode).toBe(500);
    expect(body).toEqual(new InternalException);
  });
  test('should call AuthUseCase with correct credentials', () => {
    const { sut, authUseCaseSpy } = makeSUT();
    const httpRequest = {
      body: {
        email: 'any_mail@email.com',
        password: 'any'
      }
    }
    sut.route(httpRequest);
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
  });
  test('should return 401 when invalid credentials', () => {
    const { sut, authUseCaseSpy } = makeSUT();
    authUseCaseSpy.token = null;
    const httpRequest = {
      body: {
        email: 'invalid_email@gmail.com',
        password: 'any_invalid'
      }
    }
    const { statusCode, body } = sut.route(httpRequest);
    expect(statusCode).toBe(401);
    expect(body).toEqual(new UnauthorizedError);
  });
  test('should return 200 when valid credentials', () => {
    const { sut, authUseCaseSpy } = makeSUT();
    authUseCaseSpy.token = 'TOKEN';
    const httpRequest = {
      body: {
        email: 'valid_email@gmail.com',
        password: 'valid'
      }
    }
    const { statusCode, body } = sut.route(httpRequest);
    expect(statusCode).toBe(200);
    expect(body.token).toEqual(authUseCaseSpy.token)
  });
  test('should return 500 if no AuthUseCase has provided ', () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: 'any@email.com',
        password: 'any'
      }
    }
    const { statusCode, body } = sut.route(httpRequest);
    expect(statusCode).toBe(500);
    expect(body).toEqual(new InternalException);
  });
  test('should return 500 if AuthUseCase has no auth method  ', () => {
    const sut = new LoginRouter({});
    const httpRequest = {
      body: {
        email: 'any@email.com',
        password: 'any'
      }
    }
    const { statusCode, body } = sut.route(httpRequest);
    expect(statusCode).toBe(500);
    expect(body).toEqual(new InternalException);
  });

});