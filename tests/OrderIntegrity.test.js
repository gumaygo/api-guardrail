const { ApiClient, logger } = require('../src/clients/ApiClient');
const { OrderFactory } = require('../src/factories/OrderFactory');
const { OrderSchema } = require('../src/schemas/OrderSchema');
const { generateToken } = require('../src/utils/auth');

const token = generateToken({ userId: "user_123", role: "customer" });

describe('OrderService.Contract.Tests', () => {

  test('should validate order schema on success response', async () => {
    const payload = OrderFactory.createRandomPayload();
    const mockResponse = OrderFactory.createMockResponse(payload);

    expect(mockResponse).toMatchSchema(OrderSchema);
  });

  test('should fail validation on invalid payload structure', async () => {
    const badPayload = { invalidField: true };
    
    expect(badPayload).not.toMatchSchema(OrderSchema);
  });

  test('should catch price type mismatch error', async () => {
    const payload = OrderFactory.createRandomPayload();
    const mockResponse = OrderFactory.createMockResponse(payload);
    
    mockResponse.items[0].price = "NaN"; 

    expect(mockResponse).not.toMatchSchema(OrderSchema);
  });
});
