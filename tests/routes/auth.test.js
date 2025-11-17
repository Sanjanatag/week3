const request = require('supertest');
const app = require('../../server'); 

describe('POST /api/auth/signup', () => {
  it('should create a new user and return public profile', async () => {
    const userData = {
      name: "Arissssu",
      username: "arsissuu12",
      email: "@exsample.com",
      password: "Secsrett45!"
    };

    const res = await request(app)
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
});
