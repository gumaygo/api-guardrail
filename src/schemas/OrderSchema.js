const { z } = require('zod');

/**
 * The Strict Contract for Order Response.
 * Any extra fields or type mismatches will fail the test.
 */
const OrderSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().nonnegative()
  })),
  totalPrice: z.number().positive(),
  status: z.enum(['pending', 'paid', 'cancelled']),
  createdAt: z.string().datetime()
});

module.exports = { OrderSchema };
