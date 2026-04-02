const { z } = require('zod');

/**
 * Contract schema for JSONPlaceholder /users endpoint.
 */
const UserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  address: z.object({
    street: z.string(),
    suite: z.string(),
    city: z.string(),
    zipcode: z.string(),
    geo: z.object({
      lat: z.string(),
      lng: z.string()
    })
  }),
  phone: z.string(),
  website: z.string(),
  company: z.object({
    name: z.string(),
    catchPhrase: z.string(),
    bs: z.string()
  })
});

const UsersArraySchema = z.array(UserSchema);

module.exports = { UserSchema, UsersArraySchema };
