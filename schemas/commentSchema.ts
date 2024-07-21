import { z } from 'zod';

export const commentSchema = z.object({
  title: z.string().min(1, 'required').max(80, 'maximum80CharactersAllowed'),
  content: z.string().min(1, 'required').max(200, 'maximum200CharactersAllowed'),
  rating: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
});

export type CommentSchema = z.infer<typeof commentSchema>;
