const request = require('supertest');
const server = require('../../server'); // Import the started server

describe('POST /api/auth/signup', () => {
  it('should create a new user and return public profile', async () => {
    const userData = {
      name: "Arissrrssu",
      username: "arseirssuu12",
      email: "@exsadmrple.com",
      password: "Secssrertt45!"
    };

    const res = await request(server)
      .post('/api/auth/signup')
      .send(userData)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(userData.name);
    expect(res.body.username).toBe(userData.username);
    expect(res.body.email).toBe(userData.email);

    expect(res.body.password).toBeUndefined();

    expect(res.headers['set-cookie']).toBeDefined();
    expect(
      res.headers['set-cookie'].some(cookie => cookie.startsWith('accessToken'))
    ).toBe(true);
    expect(
      res.headers['set-cookie'].some(cookie => cookie.startsWith('refreshToken'))
    ).toBe(true);
  });

  afterAll(async () => {
    // Close the server if it's an HTTP server
    if (server && typeof server.close === 'function') {
      await server.close();
    }
    // If using mongoose or another DB library, disconnect here too:
    // await mongoose.disconnect();
  });
});
