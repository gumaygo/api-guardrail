const { z } = require('zod');

expect.extend({
  toMatchSchema(received, schema) {
    const result = schema.safeParse(received);
    if (result.success) {
      return {
        message: () => `expected ${received} not to match schema`,
        pass: true,
      };
    } else {
      return {
        message: () => `Validation Error: \n${JSON.stringify(result.error.format(), null, 2)}`,
        pass: false,
      };
    }
  },
});
