const { faker } = require('@faker-js/faker');

class OrderFactory {
  static createRandomPayload() {
    return {
      userId: faker.string.uuid(),
      items: [
        { 
          productId: faker.string.uuid(), 
          quantity: faker.number.int({ min: 1, max: 10 }), 
          price: parseFloat(faker.commerce.price())
        }
      ]
    };
  }

  static createMockResponse(payload) {
    return {
      id: faker.string.uuid(),
      userId: payload.userId,
      items: payload.items,
      totalPrice: payload.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
  }
}

module.exports = { OrderFactory };
