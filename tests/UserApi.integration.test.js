const axios = require('axios');
const { UserSchema, UsersArraySchema } = require('../src/schemas/UserSchema');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

describe('UserApi.Integration.Tests', () => {

  test('GET /users should return array matching UserSchema', async () => {
    const res = await axios.get(`${BASE_URL}/users`);

    expect(res.status).toBe(200);
    expect(res.data).toHaveLength(10);
    expect(res.data).toMatchSchema(UsersArraySchema);
  });

  test('GET /users/1 should return single user matching UserSchema', async () => {
    const res = await axios.get(`${BASE_URL}/users/1`);

    expect(res.status).toBe(200);
    expect(res.data.id).toBe(1);
    expect(res.data).toMatchSchema(UserSchema);
  });

  test('GET /users/9999 should return 404', async () => {
    try {
      await axios.get(`${BASE_URL}/users/9999`);
      fail('Expected 404 error');
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test('GET /users should have correct content-type header', async () => {
    const res = await axios.get(`${BASE_URL}/users`);

    expect(res.headers['content-type']).toContain('application/json');
  });

  test('GET /users response time should be under 2000ms', async () => {
    const start = Date.now();
    await axios.get(`${BASE_URL}/users`);
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(2000);
  });
});
