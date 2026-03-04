const { faker } = require('@faker-js/faker');

class OrderFactory {
  static createRandomPayload() {
    return {
      userId: faker.datatype.uuid(),
      items: [
        { 
          productId: faker.datatype.uuid(), 
          quantity: faker.datatype.number({ min: 1, max: 10 }), 
          price: parseFloat(faker.commerce.price())
        }
      ]
    };
  }

  static createMockResponse(payload) {
    return {
      id: faker.datatype.uuid(),
      userId: payload.userId,
      items: payload.items,
      totalPrice: payload.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
  }
}

module.exports = { OrderFactory };
