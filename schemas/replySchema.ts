import { z } from 'zod';

export const replySchema = z.object({
  title: z.string().min(1, 'required').max(80, 'maximum80CharactersAllowed'),
  content: z.string().min(1, 'required').max(200, 'maximum200CharactersAllowed'),
});

export type ReplySchema = z.infer<typeof replySchema>;
