const axios = require('axios');
const { PostSchema, PostsArraySchema } = require('../src/schemas/PostSchema');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

describe('PostApi.Integration.Tests', () => {

  test('GET /posts should return array matching PostSchema', async () => {
    const res = await axios.get(`${BASE_URL}/posts`);

    expect(res.status).toBe(200);
    expect(res.data.length).toBeGreaterThan(0);
    expect(res.data).toMatchSchema(PostsArraySchema);
  });

  test('GET /posts/1 should return single post matching PostSchema', async () => {
    const res = await axios.get(`${BASE_URL}/posts/1`);

    expect(res.status).toBe(200);
    expect(res.data.id).toBe(1);
    expect(res.data.userId).toBe(1);
    expect(res.data).toMatchSchema(PostSchema);
  });

  test('GET /posts?userId=1 should filter posts by user', async () => {
    const res = await axios.get(`${BASE_URL}/posts`, { params: { userId: 1 } });

    expect(res.status).toBe(200);
    expect(res.data.length).toBeGreaterThan(0);
    res.data.forEach(post => {
      expect(post.userId).toBe(1);
    });
  });

  test('POST /posts should create a new post', async () => {
    const payload = {
      title: 'Test Post',
      body: 'This is a test post body',
      userId: 1
    };

    const res = await axios.post(`${BASE_URL}/posts`, payload);

    expect(res.status).toBe(201);
    expect(res.data.title).toBe(payload.title);
    expect(res.data.body).toBe(payload.body);
    expect(res.data.userId).toBe(payload.userId);
    expect(res.data.id).toBeDefined();
  });

  test('POST /posts with empty body should still return 201', async () => {
    const res = await axios.post(`${BASE_URL}/posts`, {});

    expect(res.status).toBe(201);
    expect(res.data.id).toBeDefined();
  });
});
