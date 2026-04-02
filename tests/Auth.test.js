const { generateToken, verifyToken } = require('../src/utils/auth');

describe('Auth.Utility.Tests', () => {

  test('should generate a valid JWT token', () => {
    const token = generateToken({ sub: 'user_123', role: 'admin' });

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3);
  });

  test('should verify a valid token and return payload', () => {
    const payload = { sub: 'user_456', role: 'customer' };
    const token = generateToken(payload);
    const decoded = verifyToken(token);

    expect(decoded.sub).toBe('user_456');
    expect(decoded.role).toBe('customer');
    expect(decoded.iat).toBeDefined();
    expect(decoded.exp).toBeDefined();
  });

  test('should reject an invalid token', () => {
    expect(() => verifyToken('invalid.token.here')).toThrow();
  });

  test('should reject a tampered token', () => {
    const token = generateToken({ sub: 'user_789' });
    const tampered = token.slice(0, -5) + 'XXXXX';

    expect(() => verifyToken(tampered)).toThrow();
  });

  test('should include expiration in generated token', () => {
    const token = generateToken({ sub: 'user_exp' });
    const decoded = verifyToken(token);

    expect(decoded.exp).toBeGreaterThan(decoded.iat);
  });
});
