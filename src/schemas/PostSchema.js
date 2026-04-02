const { z } = require('zod');

/**
 * Contract schema for JSONPlaceholder /posts endpoint.
 */
const PostSchema = z.object({
  userId: z.number().int().positive(),
  id: z.number().int().positive(),
  title: z.string().min(1),
  body: z.string().min(1)
});

const PostsArraySchema = z.array(PostSchema);

module.exports = { PostSchema, PostsArraySchema };
