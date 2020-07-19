class LoginRouter {
  route(httpRequest) {
    const { email, password } = httpRequest.body;
    if (!email || !password) {
      return {
        statusCode: 400
      }
    }
  }
}
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
});