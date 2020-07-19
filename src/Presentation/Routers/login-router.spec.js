const LoginRouter = require('./LoginRouter');
const MissingParameterError = require('../Concerns/Exceptions/MissingParameterError');

describe('login router', () => {
  test('should return 400 if no email provided', () => {
    const sut = new LoginRouter();
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
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: 'test@email.com'
      }
    }
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
  test('should return 500 if no httpRequest object is provided', () => {
    const sut = new LoginRouter();
    const httpResponse = sut.route();
    expect(httpResponse.statusCode).toBe(500);
  });
  test('should return 500 if httpRequest object has no body', () => {
    const sut = new LoginRouter();
    const httpResponse = sut.route({});
    expect(httpResponse.statusCode).toBe(500);
  });
});