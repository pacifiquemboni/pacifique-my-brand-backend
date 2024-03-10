const request = require('supertest');
const app = require('../index.js'); // Import your Express app
const jwt = require('jsonwebtoken');

jest.mock('../middleware/authmiddleware.js')
describe('Authentication Middleware', () => {
  it('should return 401 if no authorization header is provided', async () => {
    const response = await request(app).get('/blog');
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      status: 'fail',
      message: 'Missing authorization token',
    });
  });

  it('should return 401 if invalid token is provided', async () => {
    const response = await request(app)
      .get('/blog')
      .set('Authorization', 'Bearer invalid_token');
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      status: 'fail',
      message: 'Unauthorized action',
    });
  });

  it('should return 500 if token verification fails', async () => {
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error('Token verification failed');
    });

    const response = await request(app)
      .get('/blog')
      .set('Authorization', 'Bearer valid_but_unverifiable_token');

    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({
      status: 'error',
      message: 'Token verification failed',
    });

    jwt.verify.mockRestore(); // Restore the original implementation
  });

  it('should attach user object to request if token is valid', async () => {
    const user = { id: 123, username: 'test_user', role: 'admin' };
    const token = jwt.sign(user, process.env.JWT_SECRET || 'a2b3c4d5e6f7g8h9i0j');

    const response = await request(app)
      .get('/blog')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.user).toMatchObject(user);
  });
});
