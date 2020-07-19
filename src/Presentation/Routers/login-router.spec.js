const LoginRouter = require('./LoginRouter');
const MissingParameterError = require('../Concerns/Exceptions/MissingParameterError');
const UnauthorizedError = require('../Concerns/Exceptions/UnauthorizedException');
const InternalException = require('../Concerns/Exceptions/InternalException');

const makeSUT = () => {
  class AuthUseCaseSpy {
    async auth(email, password) {
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
  test('should return 400 if no email provided', async () => {
    const { sut } = makeSUT();
    const httpRequest = {
      body: {
        password: 'any'
      }
    }
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParameterError('email'));
  });
  test('should return 400 if no password provided', async () => {
    const { sut } = makeSUT();
    const httpRequest = {
      body: {
        email: 'test@email.com'
      }
    }
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
  test('should return 500 if no httpRequest object is provided', async () => {
    const { sut } = makeSUT();
    const { statusCode, body } = await sut.route();
    expect(statusCode).toBe(500);
    expect(body).toEqual(new InternalException);
  });
  test('should return 500 if httpRequest object has no body', async () => {
    const { sut } = makeSUT();
    const { statusCode, body } = await sut.route({});
    expect(statusCode).toBe(500);
    expect(body).toEqual(new InternalException);
  });
  test('should call AuthUseCase with correct credentials', async () => {
    const { sut, authUseCaseSpy } = makeSUT();
    const httpRequest = {
      body: {
        email: 'any_mail@email.com',
        password: 'any'
      }
    }
    await sut.route(httpRequest);
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
  });
  test('should return 401 when invalid credentials', async () => {
    const { sut, authUseCaseSpy } = makeSUT();
    authUseCaseSpy.token = null;
    const httpRequest = {
      body: {
        email: 'invalid_email@gmail.com',
        password: 'any_invalid'
      }
    }
    const { statusCode, body } = await sut.route(httpRequest);
    expect(statusCode).toBe(401);
    expect(body).toEqual(new UnauthorizedError);
  });
  test('should return 200 when valid credentials', async () => {
    const { sut, authUseCaseSpy } = makeSUT();
    authUseCaseSpy.token = 'TOKEN';
    const httpRequest = {
      body: {
        email: 'valid_email@gmail.com',
        password: 'valid'
      }
    }
    const { statusCode, body } = await sut.route(httpRequest);
    expect(statusCode).toBe(200);
    expect(body.token).toEqual(authUseCaseSpy.token)
  });
  test('should return 500 if no AuthUseCase has provided ', async () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: 'any@email.com',
        password: 'any'
      }
    }
    const { statusCode, body } = await sut.route(httpRequest);
    expect(statusCode).toBe(500);
    expect(body).toEqual(new InternalException);
  });
  test('should return 500 if AuthUseCase has no auth method  ', async () => {
    const sut = new LoginRouter({});
    const httpRequest = {
      body: {
        email: 'any@email.com',
        password: 'any'
      }
    }
    const { statusCode, body } = await sut.route(httpRequest);
    expect(statusCode).toBe(500);
    expect(body).toEqual(new InternalException);
  });

});